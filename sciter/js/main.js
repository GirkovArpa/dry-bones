import { $, $$, decode } from '@sciter';
import { fs } from '@sys';

main();

async function main() {
  adjustWindow();
}

function adjustWindow() {
  const w = 640;
  const h = 480;
  const [sw, sh] = Window.this.screenBox('frame', 'dimension');
  Window.this.move((sw - w) / 2, (sh - h) / 2, w, h, true);
}

$('#save').on('click', () => {
  const filename = Window.this
    .selectFile({
      mode: 'save',
      filter: 'Text Documents (*.txt)|*.txt',
      caption: 'Save',
      extension: 'txt',
    })
    ?.replace('file://', '');

  if (filename) {
    const file = fs.$open(filename, 'w', 0o666);
    const text = $('textarea').innerHTML;
    file.write(text);
    file.close();
  }
});

$('#load').on('click', () => {
  const filename = Window.this
    .selectFile({
      mode: 'open',
      filter: 'Text Documents (*.txt)|*.txt',
      caption: 'Open',
    })
    ?.replace('file://', '');

  if (filename) {
    const file = fs.$readfile(filename);
    const text = decode(file, 'utf-8');
    $('textarea').innerHTML = text;
  }
});

Window.this.on('statechange', ({ reason }) => {
  const { state } = Window.this;
  if (
    state === Window.WINDOW_FULL_SCREEN ||
    state === Window.WINDOW_MAXIMIZED
  ) {
    $('#fullscreen').classList.add('fullscreen');
  } else {
    $('#fullscreen').classList.remove('fullscreen');
  }
});

$('#fullscreen').on('click', () => {
  const { state } = Window.this;
  if (
    state === Window.WINDOW_FULL_SCREEN ||
    state === Window.WINDOW_MAXIMIZED
  ) {
    Window.this.state = Window.WINDOW_SHOWN;
  } else {
    Window.this.state = Window.WINDOW_FULL_SCREEN;
  }
});

$('#about').on('click', () => {
  Window.this.modal({ url: 'this://app/html/about.html' });
});
