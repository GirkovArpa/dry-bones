import { $, $$ } from '@sciter';
import { launch } from '@env';

$('#sciter').on('click', () => {
  launch('https://sciter.com/?ref=dry bones');
});

$('#terra-informatica').on('click', () => {
  launch('https://terrainformatica.com/?ref=dry bones');
});

$('#girkov-arpa').on('click', () => {
  launch('https://girkovarpa.itch.io/?ref=dry bones');
});

$('button').on('click', () => Window.this.close());
