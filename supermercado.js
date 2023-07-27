 // Recupera os itens do LocalStorage (se houver)
 var items = JSON.parse(localStorage.getItem('produtos')) || [];

 // Função para atualizar a lista de produtos na tela
 function atualizarLista() {
   let listaProduto = document.querySelector('.lista_prod');
   let soma = 0;
   listaProduto.innerHTML = "";

   items.forEach(function (val) {
     soma += parseFloat(val.valor);
     listaProduto.innerHTML += `
       <div class="lista_prod_single">
           <h3>${val.nome}</h3>
           <h3 class="price-prod"><span>R$${val.valor}</span></h3>
       </div>
       `;
   });

   soma = soma.toFixed(2);

   let elementoSoma = document.querySelector('.soma-prod h1');
   elementoSoma.innerHTML = 'R$' + soma;
 }

 document.querySelector('input[type=submit]').addEventListener('click', () => {
   var nomeProduto = document.querySelector('input[name=nome_produto]');
   var precoProduto = document.querySelector('input[name=price]');

   items.push({
     nome: nomeProduto.value,
     valor: precoProduto.value,
   });

   // Salva os itens no LocalStorage
   localStorage.setItem('produtos', JSON.stringify(items));

   // Atualiza a lista na tela
   atualizarLista();

   nomeProduto.value = "";
   precoProduto.value = "";
 });

 document.querySelector('button[name=limpar]').addEventListener('click', () => {
   items = [];

   // Remove os itens do LocalStorage ao limpar
   localStorage.removeItem('produtos');

   // Atualiza a lista na tela para refletir as mudanças
   atualizarLista();

   document.querySelector('.soma-prod h1').innerHTML = 'R$0';
 });

 // Chama a função para inicializar a lista na tela (caso haja produtos no LocalStorage)
 atualizarLista();