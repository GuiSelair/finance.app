## Ambiente de desenvolvimento integrado

Para a configuração do ambiente você precisará ter instalado em sua máquina o Docker, ele será essencial para a execução dos serviços. Siga o passo-a-passo abaixo:

1. Clone o repositório em sua máquina
2. Abra a pasta onde você clonou o repositório no vscode
3. Dentro do vscode instale a extensão `Dev Containers`
4. No vscode faça o seguinte comando: `Ctrl+Shift+P`. Procure pelo comando `Dev Containers: Open Folder in Container` e o selecione.
5. O vscode deverá abrir o ambiente do workspace localizado dentro do container Docker. Esse será seu ambiente de desenvolvimento, nele há tudo o que você precisa para
programar, versão correto do node, npm, yarn, extensões do vscode, etc.

Para executar a aplicação temos dois containers separados para cada dominio: api e web.

Para executar a API, siga os passos:

1. Em um terminal, acesse o diretório onde esta o clone do finance.app e execute o comando: `docker-compose up -d api-migration api`
2. Após tudo ser executado, verifique se o container esta rodando com o comando: `docker-compose ps`. O container do API deverá estar UP.

Para executar a WEB, siga os passos:

1. Em um terminal, acesse o diretório onde esta o clone do finance.app e execute o comando: `docker-compose up -d web`
2. Após tudo ser executado, verifique se o container esta rodando com o comando: `docker-compose ps`. O container do WEB deverá estar UP.

Após executar todos os comandos acima rodando novamente `docker-compose ps` deve aparecer 4 containers ativos (api, web, workspace e datasource).

A conexão com o banco de dados você pode fazer com o gerenciador de bancos de dados da sua preferência, caso queira uma recomendação utilize o dbeaver.
Segue as credenciais para ambiente de desenvolvimento:

HOST: localhost

USER: finace

PASSWORD: app