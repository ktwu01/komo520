if (import.meta.hot) {
    import.meta.hot.on('vite:error', (error) => {
        window.parent.postMessage({
          type: 'hmr-error',
          data: {
            error: error
          }
        }, '*');
    });
  }