// Configuração do Checkout Premium
// Você pode alterar este link para apontar para sua plataforma de pagamento

export const CHECKOUT_CONFIG = {
  // URL para o checkout premium (substitua pelo seu link)
  url: 'https://go.goatpayments.com.br/cgtqyfbsog',
  
  // Configurações do checkout
  openInNewTab: true,
  
  // Mensagem de confirmação (opcional)
  confirmationMessage: 'Você será redirecionado para a página de pagamento. Deseja continuar?'
};

// Função para abrir o checkout
export const openCheckout = () => {
  const { url, openInNewTab, confirmationMessage } = CHECKOUT_CONFIG;
  
  // Se há mensagem de confirmação, perguntar ao usuário
  if (confirmationMessage) {
    const confirmed = window.confirm(confirmationMessage);
    if (!confirmed) return;
  }
  
  // Abrir checkout
  if (openInNewTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};

// Função para atualizar o link do checkout (para usar no console)
export const updateCheckoutUrl = (newUrl: string) => {
  CHECKOUT_CONFIG.url = newUrl;
  if (process.env.NODE_ENV === 'development') {
    console.log(`✅ Link do checkout atualizado para: ${newUrl}`);
  }
};

// Disponibilizar no console global para facilitar configuração
declare global {
  interface Window {
    LuzDeCristoCheckout: {
      updateUrl: (newUrl: string) => void;
      getUrl: () => string;
      openCheckout: () => void;
    };
  }
}

if (typeof window !== 'undefined') {
  window.LuzDeCristoCheckout = {
    updateUrl: updateCheckoutUrl,
    getUrl: () => CHECKOUT_CONFIG.url,
    openCheckout
  };
} 