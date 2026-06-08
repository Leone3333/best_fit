# 1. Escolhe uma imagem leve do Node.js baseada em Linux Alpine
FROM node:20-alpine

# 2. Define a pasta onde o app vai morar dentro do container
WORKDIR /usr/src/

# 3. Copia os arquivos de dependências primeiro 
COPY package*.json ./

# 4. Instala as dependências do projeto (focado em produção)
RUN npm install --only=production

# 5. Copia o resto dos arquivos 
COPY . .

# 6. Avisa ao Docker que o container vai escutar na porta 3000
EXPOSE 8080

# 7. Comando definitivo para iniciar o servidor do BestFit
CMD ["npm", "start"]