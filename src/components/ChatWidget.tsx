import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

// Global flag to track initialization across re-mounts
let isChatInitialized = false;

const ChatWidget = () => {
  useEffect(() => {
    // Check if chat is already initialized globally or in DOM
    if (isChatInitialized || document.querySelector('.n8n-chat-widget')) {
      return;
    }

    const webhookUrl = 'https://my-agents-jai.app.n8n.cloud/webhook/d5d2d369-bf07-4ad2-8559-1cf91210b167/chat';
    
    try {
      createChat({
        webhookUrl: webhookUrl,
        target: '#n8n-chat-container',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        enableStreaming: false,
        showWelcomeScreen: true,
        i18n: {
          en: {
            title: 'Arkanj Assistant',
            subtitle: 'How can we help you today?',
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question...',
            closeButtonTooltip: 'Close Chat',
          }
        },
        initialMessages: [
          'Hello! I am the Arkanj AI assistant.',
          'Ask me about our services or policies!'
        ],
      });
      isChatInitialized = true;
    } catch (error) {
      console.error('Error initializing n8n chat:', error);
    }

    // Cleanup function
    return () => {
      // We don't reset isChatInitialized here because the Vue app 
      // might still be "alive" in the background or attached to the DOM
      // and the library doesn't provide an explicit unmount.
    };
  }, []);

  return (
    <div id="n8n-chat-container"></div>
  );
};

export default ChatWidget;
