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
// 4. Criatura Amigável
  async function criaturaAmigavel() {
      try {
          const querySnapshot = await db.collection("criaturas").get();
          let listaDeCriaturas = [];

          querySnapshot.forEach(doc => {
              const dados = doc.data();
              listaDeCriaturas.push({
                  nome: dados.nome,
                  habilidades: dados.habilidades || [],
                  total: (dados.habilidades || []).length
              });
          });
          listaDeCriaturas.sort((a, b) => a.total - b.total);
          const criatura = listaDeCriaturas[0];

          if (criatura) {
              const habilidadesFormatadas = criatura.habilidades.join(", ");
              
              let resultado = "<strong>Criatura Amigável encontrada:</strong><br>";
              resultado += `🐾 ${criatura.nome}<br>`;
              resultado += `✨ Habilidades: ${habilidadesFormatadas}`;
              
              document.getElementById("resultado").innerHTML = resultado;
          }

      } catch (error) {
          console.error("Erro ao processar criatura amigável:", error);
      }
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