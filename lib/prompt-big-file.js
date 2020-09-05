let subscription;

module.exports = {
  config: {
    Threshold: {
      description: 'Threshold in Megabytes (MB)',
      type: 'number',
      default: 1.0,
      minimum: 0.0,
    },
  },
  activate: state => {
    subscription = atom.workspace.observeTextEditors( item => {
      const size = item.getText().length
      if (size >= atom.config.get('prompt-big-file.Threshold') * 1024 * 1024) {
        atom.confirm({
          message: `Warning: about to open a ${Math.floor(size).toLocaleString()} byte file.`,
          buttons: {
            // Abort is listed first because Esc chooses the first option.
            Abort: () => item.destroy(),
            Continue: () => {},
          }
        });
      }
    });
  },
  deactivate: () => subscription.dispose(),
};
