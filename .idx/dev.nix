{ pkgs, ... }: {
  # Pacotes necessários (Python é ótimo para um servidor rápido)
  packages = [
    pkgs.python3
  ];

  # Configurações do IDX
  idx = {
    # Extensões que ajudam no desenvolvimento
    extensions = [
      "ritwickdey.LiveServer"
    ];

    # É aqui que a mágica do Preview acontece!
    previews = {
      enable = true;
      previews = {
        web = {
          # Comando para rodar um servidor na porta 3000
          command = ["python3" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}