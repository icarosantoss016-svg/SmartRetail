<template>
<div class="container mt-5">
    <div 
    class="d-flex 
    justify-content-between
    align-items-center
    mb-4">
        <h2>Gestão do Produtos</h2>
        <button
        @click="mostraFormulario = !mostraFormulario"
        class="btn btn-primary">
            {{ mostraFormulario ? 'Cancelar' }}
        </button>
    </div>
</div>
</template>

<script>
export default{
    name:'ProdutoView',

    data(){
        return{
        mostraFormulario:false,
        form:{
        produtoId:'',
        nome:'',
        categoria:'',
        cor:'#000000',
        tipoTecido:'',
        preco:'',
        imagem:''
        } 
    }
},
method:{
    processarImagem(evento){
        const arquivo=evento.target.files[0]
        if(!arquivo){
            return
        }
        const leitor = new FileReader()

        leitor.onload =(e)=>{
            this.form.imagem =e.target.result
        }
        leitor.readAsDataURL(arquivo)
    },
    SalvarProduto(){
        console.log("Enviando para o bando de dados o produto: ",this.form)
        alert("Produto convertido, pronto para envio.")
    }
}
    
    
}
</script>