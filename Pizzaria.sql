create schema Pizzaria
--Os ingredientes serão salvos na API.
create table Pizzaria.Funcionario                   --O gerente sempre é o 1° registro, pois ele cadastra os Funcionários
	(idFunc int primary key identity(1,1),
	 nome varchar(30),
	 func varchar(30),    --funcao/cargo(entregador, cozinheiro, etc)
	 sobrenome varchar(30),
	 Email varchar(100),
	 senha varchar(50),
	 dataNasc date,
	 genero char,   --M,F ou ?(Masc,Fem ou prefiro n�o dizer))
	)

create table Pizzaria.Cliente
	(idCliente int primary key identity(1,1),
	 nome varchar(30),
	 sobrenome varchar(30),
	 Email varchar(100),
	 senha varchar(50),
	 endereco varchar(100),
	 dataNasc date,
	 genero char,   --M,F ou ?(Masc,Fem ou prefiro n�o dizer)
	)

create table Pizzaria.Mesa
	(idMesa int primary key identity(1,1))

create table Pizzaria.Pizza
	(idPizza int primary key identity(1,1),
	 nomePizza varchar(50),
	 precoPizza money,
	 NumCard int unique null,
	)

create table Pizzaria.ingrediente
	(
	idIng int primary key identity(1,1),
	nome varchar(20),
	idPizza int,     -- A pizza que o ingrediente compõe
	quant int,       -- Quantidade de ingrediente X que a pizza contém
	foreign key(idPizza) references Pizzaria.Pizza(idPizza)
	)

create table Pizzaria.Bebida
	(idBebida int primary key identity(1,1),
	 nomeBebida varchar(50),
	 precoBebida money,
	 NumCard int unique null,
	)

create table Pizzaria.pedido
	(idPedido int primary key identity(1,1),
	 idPizza int,
	 idBebida int null,
	 idFunc int,
	 idCliente int,
	 NumeroDePizzas int,
	 NumeroDeBebidas int null,
	 tamanhoDaPizza varchar(10),
	 precoPedido money,
	 dataDeEntrega date,
	 diaDoPedido date,
	 foreign key(idPizza) references Pizzaria.Pizza(idPizza),
	 foreign key(idBebida) references Pizzaria.Bebida(idBebida),
	 foreign key(idFunc) references Pizzaria.Funcionario(idFunc),
	 foreign key(idCliente) references Pizzaria.Cliente(idCliente)
	)

create table Pizzaria.CarrinhoDeCompras	
	(NumProduto int primary key identity(1,1),
	 idPizza int null,
	 idBebida int null,
	 idCliente int,
	 NumeroDePizzas int null,
	 NumeroDeBebidas int null,
	 tamanhoDaPizza varchar(10) null,
	 dataPedido date,
	 foreign key(idPizza) references Pizzaria.Pizza(idPizza),
	 foreign key(idBebida) references Pizzaria.Bebida(idBebida),
	 foreign key(idCliente) references Pizzaria.Cliente(idCliente),
	)

create view Pizzaria.V_CardapioPizzas
	AS
	SELECT TOP 100 percent
		P.nomePizza, P.idPizza, P.precoPizza, P.NumCard
	FROM
		Pizzaria.Pizza P order by P.NumCard

create view Pizzaria.V_CardapioBebidas
	AS
	SELECT TOP 100 percent
		B.nomeBebida, B.idBebida, B.precoBebida, B.NumCard
	FROM
		Pizzaria.Bebida B order by B.NumCard

create nonclustered index ixEmailFunc
on Pizzaria.Funcionario(Email) 
create nonclustered index ixEmailClient
on Pizzaria.Cliente(Email)
create nonclustered index ixSenhaFunc
on Pizzaria.Funcionario(senha) 
create nonclustered index ixSenhaClient
on Pizzaria.Cliente(senha)

create or alter procedure Pizzaria.VerifEmailESenhaFunc
		@Email varchar(100),
		@senha varchar(50),
		@func varchar(30) output
	as
		begin
			declare @verifFunc varchar(50) = @func
			declare cFunc cursor for
				Select func from Pizzaria.Funcionario where Email = @Email and senha = @senha
			open cFunc
			fetch cFunc into @verifFunc
			if @@FETCH_STATUS = 0
				begin
					set @func = @verifFunc
				end
		end


create or alter procedure Pizzaria.VerifEmailESenhaCliente
		@Email varchar(100),
		@senha varchar(50),
		@name varchar(30) output
	as
		begin
			declare @verifClient varchar(50) = @name
			declare cClient cursor for
				Select nome from Pizzaria.Cliente where Email = @Email and senha = @senha
			open cClient
			fetch cClient into @verifClient
			if @@FETCH_STATUS = 0
				begin
					set @name = @verifClient
				end
		end

create or alter procedure Pizzaria.VerifEmailESenha
		@Email varchar(100),
		@senha varchar(50),
		@Resultado varchar(30) output
	as
		begin
			declare @res varchar(30) = 'undefined'
			exec Pizzaria.VerifEmailESenhaCliente @Email, @senha, @res
			exec Pizzaria.VerifEmailESenhaFunc @Email, @senha, @res
			set @Resultado = @res
		end

create or alter procedure Pizzaria.adicionarProdCarrinho
	@idProduto int,
	@quantProd int,
	@idCliente int,
	@tipo char,          --P ou B(Pizza ou bebida)
	@TamanhoPizza varchar(10) null
	as
		begin
		begin Tran
		insert into Pizzaria.CarrinhoDeCompras(idCliente) values (@idCliente) 
		if (@tipo = 'P')
			begin
				declare @cont_prod int
				declare preco cursor for select idPizza from Pizzaria.Pizza where idPizza = @idProduto
				open preco
				fetch preco into @cont_prod
				if @@FETCH_STATUS = 0
					begin
					update Pizzaria.CarrinhoDeCompras 
					set
						dataPedido = getDate(), tamanhoDaPizza = @TamanhoPizza,  NumeroDePizzas = @quantProd, idPizza = @idProduto
					where
						NumProduto = @@IDENTITY
					end
				commit Tran
			end
		else
		if (@tipo = 'B')
			begin
				declare preco cursor for select precoBebida from Pizzaria.Bebida where idBebida = @idProduto
				open preco
				fetch preco into @cont_prod
				if @@FETCH_STATUS = 0
					begin
					update Pizzaria.CarrinhoDeCompras 
					set
						dataPedido = getDate(), NumeroDeBebidas = @quantProd, idBebida = @idProduto
					where
						NumProduto = @@IDENTITY
					end
				commit Tran
			end
			if(@tipo != 'P' and @tipo != 'B')
			begin
				rollback Tran
			end
		end

create or alter procedure Pizzaria.FinalizarCompra
	@idCliente int,
	@idFunc int
	as
	begin
							declare @NumProduto int
							declare @idPizza int
							declare @idBebida int
							declare @NumeroDePizzas int 
							declare @NumeroDeBebidas int 
							declare @tamanhoDaPizza varchar(10)
							declare @dataPedido date
							declare @valorTotal int = 0
							declare @precoPizza int
							declare @precoBebida int
		declare cCompra cursor for select NumProduto , idPizza, idBebida, NumeroDePizzas, NumeroDeBebidas, tamanhoDaPizza, dataPedido from Pizzaria.CarrinhoDeCompras where idCliente = @idCliente
		open cCompra
		fetch cCompra into	@NumProduto ,
							@idPizza,
							@idBebida,
							@NumeroDePizzas,
							@NumeroDeBebidas,
							@tamanhoDaPizza,
							@dataPedido
		while @@FETCH_STATUS = 0
		begin
			declare cPreco cursor for select P.precoPizza, B.precoBebida from Pizzaria.Pizza P,Pizzaria.Bebida B where @idPizza = P.idPizza or @idBebida = idBebida 
			open cPreco
			fetch cPreco into @precoPizza, @precoBebida
			while @@FETCH_STATUS = 0
				begin
					if (@precoPizza = null)
						set @precoPizza = 0
					if (@precoBebida = null)
						set @precoBebida = 0
					set @valorTotal += @precoPizza + @precoBebida
				end
				close cPreco
				deallocate cPreco
				insert into Pizzaria.pedido
				(
					idPizza,
					idBebida,
					idFunc,
					idCliente,
					NumeroDePizzas,
					NumeroDeBebidas,
					tamanhoDaPizza,
					precoPedido,
					dataDeEntrega,
					diaDoPedido
					) 
				values 
				(
					 @idPizza,
					 @idBebida,
					 @idFunc,
					 @idCliente,
					 @NumeroDePizzas,
					 @NumeroDeBebidas,
					 @tamanhoDaPizza,
					 @valorTotal,
					 null,
					 getDate()
					 )
				set @valorTotal = 0
		end
		close cCompra
		deallocate cCompra
	end
