# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail cadastrado no sistema;
- O usuário deve receber um e-mail com instruções de recuperação de sua senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar a senha deve expirar em 2 horas;
- O usuário precisa informar a nova senha duas vezes ao resetar a senha anterior;

# Atualização de perfil

**RF**

-  usuário deve poder atualizar seu nome, e-mail, senha e avatar;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado no sistema;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador em um determinado dia devem ser mantidos em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deverá ter um status de lida ou não lida para controle do prestador;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

- A listagem de prestadores de serviço deve ser armazenada em cache;

**RN**

- Cada agendamento deve ter duração exata de 1 hora;
- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

