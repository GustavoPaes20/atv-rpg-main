// Configuração do seu Firebase (atv-rpg-62514)
const firebaseConfig = {
    apiKey: "AIzaSyD1kCl2vPf8qySZoAVU0P668CbiPQIBXeU",
    authDomain: "atv-rpg-62514.firebaseapp.com",
    projectId: "atv-rpg-62514",
    storageBucket: "atv-rpg-62514.firebasestorage.app",
    messagingSenderId: "731937959831",
    appId: "1:731937959831:web:caba4a8f2b0562370e1ed2"
  };
  
  // Inicializa o Firebase
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  
  // --- FUNÇÕES DE CONSULTA ---
  
// 1. Criaturas Poderosas
  async function consultarCriaturas() {
      try {
          const querySnapshot = await db.collection("criaturas")
                                        .orderBy("habilidades", "desc")
                                        .limit(3)
                                        .get();
          let resultado = "<strong>As 3 Criaturas mais poderosas:</strong><br>";
          
          querySnapshot.forEach(doc => {
              const dados = doc.data();
              resultado += `✨ ${dados.nome} | tipo: ${dados.tipo} | habilidades: ${dados.habilidades}<br>`;
          });
          
          document.getElementById("resultado").innerHTML = resultado;
          
      } catch (error) {
          console.error("Erro ao buscar as criaturas poderosas:", error);
          document.getElementById("resultado").innerHTML = "Erro ao carregar os dados.";
      }
  }
  
  // 2. Artefatos não reclamados
  async function consultarArtefatos() {
      const querySnapshot = await db.collection("artefaos_encantados").where("proprietario", "==", "").get();
      let resultado = "<strong>Artefatos sem dono:</strong><br>";
      if (querySnapshot.empty) {
          resultado = "Todos os artefatos já têm donos!";
      }
      querySnapshot.forEach(doc => {
          resultado += `🛡️ ${doc.data().nome}<br>`;
      });
      document.getElementById("resultado").innerHTML = resultado;
  }
  
  // 3. Poções de Cura
  async function contarPocaoCura() {
      const querySnapshot = await db.collection("poções").where("efeitos", "==", "cura").get();
      const count = querySnapshot.size;
      document.getElementById("resultado").innerHTML = `🧪 Existem ${count} poções de cura no inventário.`;
  }
 // 4. Criatura mais amigavel
async function criaturaAmigavel() {
    const querySnapshot = await db.collection("criaturas").get();
    let criaturas = [];

    querySnapshot.forEach(doc => {
        let dados = doc.data();
        criaturas.push({
            nome: dados.nome,
            qtd: dados.habilidades ? dados.habilidades.length : 0
        });
    });

    criaturas.sort((a, b) => a.qtd - b.qtd);

    const maisAmigavel = criaturas[0];
    document.getElementById("resultado").innerHTML = `🐾 ${maisAmigavel.nome} - ${maisAmigavel.qtd} habilidade(s)`;
}
  // 5. Artefatos de Invisibilidade
  async function artefatosInvisibilidade() {
      const querySnapshot = await db.collection("artefaos_encantados").where("efeitos", "array-contains", "invisibilidade").get();
      let resultado = "<strong>Feiticeiros invisíveis:</strong><br>";
      if (querySnapshot.empty) {
          resultado = "Ninguém usando invisibilidade no momento.";
      }
      querySnapshot.forEach(doc => {
          resultado += `👤 ${doc.data().proprietario} (usando ${doc.data().nome})<br>`;
      });
      document.getElementById("resultado").innerHTML = resultado;
  }