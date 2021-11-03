# Cadastro de carro
**Requisito funcional**
Deve ser possivel cadastrar um novo carro

**Regra de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão com disponibilidade.
O usúario responsável pelo cadastro deve ser um usuário admnistrador.

# Listagem de carros
**Requisito funcional** 
Deve ser possivel listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categória.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro
**Requisito funcional**
Deve ser possível cadastrar uma especificação para um carro.

**Regra de negócio**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma mesma especificação já existe para o mesmo carro.
O usúario responsável pelo cadastro deve ser um usuário admnistrador.

# Cadastro de imagens do carro

**Requisito funcional**
Deve ser possível cadastrar a imagem do carro.


**Requisito nao funcional**
Usar o multer para upload de arquivos.

**Regra de negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usúario responsável pelo cadastro deve ser um usuário admnistrador.

# Aluguel de carro

**Requisito funcional**
Deve ser possível cadastrar um aluguel

**Regra de negócio**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação
Ao realizar um aluguel o status do carro deverá ser alterado para indisponível

# Devolução de carros

**RF**
Deve ser possivel realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa 
proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de Alugueis para o usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
O usuário deve estar logado na aplicação

# Recuperar Senha

**RF**
- Deve ser possivel o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas
