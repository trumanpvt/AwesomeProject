export default function FooterStore() {
  return {
    mode: 'ARTICLES',
    setMode(newMode) {
      this.mode = newMode;
    },
  };
}
