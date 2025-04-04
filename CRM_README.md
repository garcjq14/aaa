# Sistema de CRM e Painel Administrativo

Este documento descreve a implementação do sistema de CRM (Customer Relationship Management) e o painel administrativo integrados ao quiz do site.

## Visão Geral

O sistema implementa:

1. **Formulário de Pré-briefing**: Coleta dados de usuários antes de iniciar o quiz
2. **Integração com o Quiz**: Armazena as respostas e resultados do quiz junto com os dados do cliente
3. **Painel Administrativo**: Interface para gerenciar leads, visualizar estatísticas e monitorar o desempenho

## Estrutura do Código

### Tipos e Definições
- `/src/types/crm.ts`: Contém as interfaces e tipos do sistema

### Serviços
- `/src/lib/authService.ts`: Gerencia autenticação para o painel administrativo
- `/src/lib/crmService.ts`: Gerencia operações de CRM (criar/atualizar leads, estatísticas, etc.)

### Hooks
- `/src/hooks/useAuth.tsx`: Contexto para gerenciar estado de autenticação
- `/src/hooks/useLeads.tsx`: Hook para gerenciar operações com leads

### Componentes
- `/src/components/crm/PreBriefingForm.tsx`: Formulário de pré-briefing
- `/src/components/quiz/QuizWithPreBriefing.tsx`: Integração do formulário com o quiz

### Painel Administrativo
- `/src/components/admin/layout/`: Componentes de layout do painel
- `/src/pages/admin/`: Páginas do painel administrativo

## Como Usar

### Pré-briefing e CRM

1. O componente `QuizWithPreBriefing` serve como wrapper para o quiz original
2. Primeiro é exibido o formulário de pré-briefing que coleta dados do usuário
3. Após o preenchimento, o usuário é direcionado para o quiz
4. Ao finalizar o quiz, os resultados são associados ao lead criado

### Painel Administrativo

1. Acesse o painel através da rota `/admin/login`
   - **Credenciais de demonstração**: 
     - Usuário: `admin`
     - Senha: `admin123`
2. O dashboard exibe estatísticas de leads e conversões
3. A página de leads permite gerenciar os contatos, alterar status e exportar dados

## Armazenamento de Dados

O sistema atual utiliza o localStorage para demonstração, permitindo uma rápida implementação sem necessidade de backend:

- `crmLeads`: Armazena os dados dos leads
- `crmConfig`: Configurações do CRM
- `admin_auth_token`: Token de autenticação para o painel

## Próximos Passos

Para uma implementação completa em produção, recomenda-se:

1. Migrar o armazenamento para um banco de dados real como Firebase/Supabase
2. Implementar autenticação segura com JWT e credenciais criptografadas
3. Desenvolver os recursos de kanban e gerenciamento de conteúdo
4. Expandir as integrações com sistemas de CRM externos via API

## Customização

É possível customizar o sistema modificando:

- Campos do formulário de pré-briefing em `PreBriefingForm.tsx`
- Status e fluxo de leads nas constantes em `types/crm.ts`
- Layout e funcionalidades do painel administrivo nos componentes em `components/admin` 