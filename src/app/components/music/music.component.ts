import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {

  private basePath = 'assets/music/';
  public audio = new Audio(); // Audio player global
  public selectedTrack = { title: '', file: '', duration: 'Escoge una Canción', lyrics: '' }; // Track selected by the user
  public currentTime = '0:00';
  public totalTime = '0:00';
  public playing = false;

  momentosTracks: any[] = [
    { title: 'Momentos', file: 'Momentos.mp3', duration: '', lyrics: 'Letra de Momentos...' },
    { title: 'Tú', file: 'Tu.mp3', duration: '', lyrics: '' },
    { title: 'Cómo decirte “te quiero“', file: 'ComoDecirteTeQuiero.mp3', duration: '', lyrics: '' },
    { title: '¿Cuándo te voy a encontrar?', file: 'CuandoTeVoyAEncontrar.mp3', duration: '', lyrics: '' },
    { title: 'Yo canto para ti', file: 'YoCantoParaTi.mp3', duration: '', lyrics: '' },
    { title: 'Inspiración', file: 'Inspiracion.mp3', duration: '', lyrics: '' },
    { title: 'Vida, ¿Qué nos pasa?', file: 'VidaQueNosPasa.mp3', duration: '', lyrics: '' },
    { title: 'Ser feliz', file: 'SerFeliz.mp3', duration: '', lyrics: '' },
    { title: 'Tu camino', file: 'TuCamino.mp3', duration: '', lyrics: '' },
    { title: 'Aún recuerdo a mi tierra', file: 'AunRecuerdoAMiTierra.mp3', duration: '', lyrics: '' },
    { title: 'Eres mi música', file: 'EresMiMusica.mp3', duration: '', lyrics: '' },
    { title: 'Beatriz', file: 'Beatriz.mp3', duration: '', lyrics: '' }
  ];

  constructor() {
    // Update realtime the current time of the song
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.formatTime(this.audio.currentTime);
      this.totalTime = this.formatTime(this.audio.duration || 0);
    });

    // Reset the times when the song ends
    this.audio.addEventListener('ended', () => {
      this.currentTime = '0:00';
      this.totalTime = '0:00';
    });
  }

  ngOnInit(): void {
    this.loadSongDurations();
    //this.loadLyrics();
  }

  /**
   * Function to load the duration of each song in the audio player
   */
  loadSongDurations(): void {
    this.momentosTracks.forEach(song => {
      const audio = new Audio(`${this.basePath}momentos/tracks/${song.file}`);
      audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        song.duration = `${minutes}:${seconds}`;
      });
    });
  }

  /**
   * Function to load the lyrics of each song in the audio player
   */
  // loadLyrics(): void {
  //   const lyricsPromises = this.momentosTracks.map(track => 
  //     this.http.get(`assets/music/momentos/lyrics/${track.file.replace('.mp3', 'Lyrics.txt')}`, 
  //     { responseType: 'text' }).toPromise()
  //       .then(lyrics => {
  //         track.lyrics = lyrics;
  //       })
  //       .catch(() => {
  //         track.lyrics = 'Lyrics not found';
  //       })
  //   );

  //   Promise.all(lyricsPromises).then(() => {
  //     console.log('All lyrics loaded');
  //   });
  // }

  /**
   * Function to play a track in the audio player
   * @param track - Track to play
   * @returns void
   */
  playTrack(track: any): void {
    if (this.selectedTrack === track) {
      this.audio.pause();
      this.selectedTrack = { title: '', file: '', duration: 'Escoge una Canción', lyrics: '' };
      this.audio.src = '';
      this.playing = false;
    } else {
      // Play the selected track
      this.selectedTrack = track;
      this.audio.src = `${this.basePath}momentos/tracks/${track.file}`;
      this.audio.load();
      this.audio.play();
      this.playing = true;
      console.log(this.selectedTrack);
    }
  }

  /**
   * Function to play or pause the audio player
   * @returns void
   */
  togglePlayPause(): void {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
    } else {
      this.audio.play();
      this.playing = true;
    }
  }

  /**
   * Function to format the time in the audio player
   * @param time - Time in seconds
   * @returns string - Time formatted
   */
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  /**
   * Function to download a track
   * @param track - Track to download
   */
  downloadTrack(track: any): void {
    const link = document.createElement('a');
    link.href = `${this.basePath}momentos/tracks/${track.file}`;
    link.download = track.file;
    link.click();
  }
}