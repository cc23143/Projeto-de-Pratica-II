public class produto {
    String titulo;
    double preco;
    private String imagemSrc;

    public produto(String titulo, double preco, String imagemSrc) {
        this.titulo = titulo;
        this.preco = preco;
        this.imagemSrc = imagemSrc;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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
