# Day Trader AUGE - Site de Mentoria

Site oficial da mentoria Day Trader AUGE com informações sobre cursos, mentores e módulos de aprendizado.

## 🚀 Como Iniciar o Site Localmente

### Pré-requisitos
- Node.js instalado no seu computador
- Git instalado

### Passo a Passo

1. **Clone o repositório (se ainda não tiver)**
   ```bash
   git clone https://github.com/seu-usuario/Site-AugeMentoria.git
   cd Site-AugeMentoria
   ```

2. **Inicie o servidor local**
   ```bash
   node server.js
   ```

3. **Acesse o site**
   - Abra seu navegador
   - Vá para: `http://localhost:8000`

## 📤 Como Subir Alterações para o GitHub

1. **Adicione as alterações**
   ```bash
   git add .
   ```

2. **Faça o commit**
   ```bash
   git commit -m "Descrição das suas alterações"
   ```

3. **Envie para o GitHub**
   ```bash
   git push origin main
   ```

## 🌐 Como Fazer Deploy no Vercel

### Método 1: Via GitHub (Recomendado)

1. **Acesse o Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Importe o projeto**
   - Clique em "New Project"
   - Selecione seu repositório "Site-AugeMentoria"
   - Clique em "Import"

3. **Configure o projeto**
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (deixe vazio)
   - **Output Directory**: ./
   - **Install Command**: (deixe vazio)

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o processo finalizar
   - Seu site estará disponível em uma URL do Vercel

### Método 2: Via Vercel CLI

1. **Instale o Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Faça login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## 📁 Estrutura do Projeto

```
f:\Prototipo Auge\
├── assets/
│   ├── images/          # Imagens do site
│   ├── config.js        # Configurações
│   └── image-loader.js  # Carregador de imagens
├── index.html           # Página principal
├── styles.css           # Estilos CSS
├── server.js            # Servidor Node.js
└── README.md            # Este arquivo
```

## 🔧 Configurações Importantes

- **Porta do servidor**: 8000
- **Arquivos principais**: `index.html`, `styles.css`
- **Imagens**: Pasta `assets/images/`

## 📝 Notas

- O site é estático e não requer banco de dados
- As imagens são carregadas dinamicamente
- O servidor Node.js é apenas para desenvolvimento local
- No Vercel, o site funcionará como site estático

## 🆘 Problemas Comuns

**Erro de porta ocupada:**
```bash
# Mate o processo na porta 8000
netstat -ano | findstr :8000
taskkill /PID [número_do_processo] /F
```

**Imagens não carregam:**
- Verifique se as imagens estão na pasta `assets/images/`
- Confirme os nomes dos arquivos no código

---

✨ **Desenvolvido por Matheus Leon - Inspire Tech Company** ✨