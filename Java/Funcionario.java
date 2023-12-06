import java.util.Date; 
import java.sql.*;       
public class Funcionario {
    private int idFunc;      
    private String nome;
    private String sobrenome;
    private String func;
    private String email;
    private String senha;
    private Date dataNasc;
    private char genero;
    public Funcionario(/*String nome,String sobrenome,String func,String email,String senha,*/Date dataNasc/* ,char genero*/) throws Exception{
        Date DataAtual = new Date();
        if(dataNasc.before(DataAtual)){
            this.dataNasc=dataNasc;
        }else{
            throw new Exception("A data de Nascimento tem que ser menor que a data atual!Data Atual:" + DataAtual.toString());
        }
        //https://www.youtube.com/watch?v=yBhBaya7tF4
        //https://learn.microsoft.com/en-us/sql/connect/jdbc/building-the-connection-url?view=sql-server-ver16
        try{
            Connection con = DriverManager.getConnection("jdbc:sqlserver:regulus//sqlexpress;database=BD23143;encrypt=true;integratedSecurity=true;","BD23143","BD23143");
            Statement  stm = con.createStatement();
            ResultSet   rs = stm.executeQuery("select count(*) from Pizzaria.Funcionario");
            System.out.println(rs);
        }catch(Exception e){
            System.out.println(e);
        }
        /* 
        this.nome=nome;
        this.sobrenome=sobrenome;
        this.func=func;
        this.email=email;
        this.senha=senha;
        this.genero=genero;
        */
    }

    public int getIdFunc() {
        return this.idFunc;
    }

    public void setIdFunc(int idFunc) {
        this.idFunc = idFunc;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return this.sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getFunc() {
        return this.func;
    }

    public void setFunc(String func) {
        this.func = func;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Date getDataNasc() {
        return this.dataNasc;
    }

    public void setDataNasc(Date dataNasc) {
        this.dataNasc = dataNasc;
    }

    public char getGenero() {
        return this.genero;
    }

    public void setGenero(char genero) {
        this.genero = genero;
    }

}