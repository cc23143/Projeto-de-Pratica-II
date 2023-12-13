public class produto {
    String nome;
    double preco;
    private String imagemSrc;

    public produto(String nome, double preco, String imagemSrc) {
        this.nome = nome;
        this.preco = preco;
        this.imagemSrc = imagemSrc;
    }

    public String getnome() {
        return this.nome;
    }

    public double getPreco() {
        return this.preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getImagemSrc() {
        return this.imagemSrc;
    }

    public void setImagemSrc(String imagemSrc) {
        this.imagemSrc = imagemSrc;
    }

}
