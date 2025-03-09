import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

// Interface to define the Track object
interface Track {
  title: string;
  file: string;
  duration: string;
  lyrics: string;
  album: string;
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements AfterViewInit {

  private basePath = 'assets/music/';
  public audio: HTMLAudioElement = new Audio(); // Global audio player
  public selectedTrack: Track = {
    title: '',
    file: '',
    duration: 'Escoge una Canción',
    lyrics: '',
    album: ''
  };
  public currentTime = '0:00';
  public totalTime = '0:00';
  public playing = false;
  public expandContainer = false;

  momentosTracks: Track[] = [
    { title: 'Momentos', file: 'Momentos.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Tú', file: 'Tu.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Cómo decirte “te quiero“', file: 'ComoDecirteTeQuiero.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: '¿Cuándo te voy a encontrar?', file: 'CuandoTeVoyAEncontrar.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Yo canto para ti', file: 'YoCantoParaTi.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Inspiración', file: 'Inspiracion.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Vida, ¿Qué nos pasa?', file: 'VidaQueNosPasa.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Ser feliz', file: 'SerFeliz.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Tu camino', file: 'TuCamino.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Aún recuerdo a mi tierra', file: 'AunRecuerdoAMiTierra.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Eres mi música', file: 'EresMiMusica.mp3', duration: '', lyrics: '', album: "momentos" },
    { title: 'Beatriz', file: 'Beatriz.mp3', duration: '', lyrics: '', album: "momentos" }
  ];

  vivirTracks: Track[] = [
    { title: 'Mi Vida', file: 'MiVida.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Hace tiempo ya', file: 'HaceTiempoYa.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Cuando pienso en ti', file: 'CuandoPiensoEnTi.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Emilia', file: 'Emilia.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Vivir', file: 'Vivir.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'De tiempos idos', file: 'DeTiemposIdos.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Las Cosas que son', file: 'LasCosasQueSon.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Primavera', file: 'Primavera.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Cerca de Piedra', file: 'CercaDePiedra.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Amistad', file: 'Amistad.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Questionable Questions', file: 'QuestionableQuestions.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Eres mi Imaginación', file: 'EresMiImaginacion.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Fábula', file: 'Fabula.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Verdades Sencillas', file: 'VerdadesSencillas.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Sueño Español', file: 'SuenoEspanol.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Variaciones', file: 'Variaciones.mp3', duration: '', lyrics: '', album: "vivir" },
    { title: 'Los Dos Lados de la Luna', file: 'LosDosLadosDeLaLuna.mp3', duration: '', lyrics: '', album: "vivir" }
  ];

  olalTracks: Track[] = [
    { title: 'What is Love?', file: 'WhatIsLove.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'My Love will always find You', file: 'MyLoveWillAlwaysFindYou.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'To find the Light', file: 'ToFindTheLight.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'Is Love worth waiting for?', file: 'IsLoveWorthWaitingFor.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'Endless Romance', file: 'EndlessRomance.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'If I look back', file: 'IfILookBack.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'This Road', file: 'ThisRoad.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'Advice on Love', file: 'AdviceOnLove.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'Lines in my Hand', file: 'LinesInMyHand.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'What do You do?', file: 'WhatDoYouDo.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'What a Life that would be', file: 'WhatALifeThatWouldBe.mp3', duration: '', lyrics: '', album: "olal" },
    { title: 'The World is going Mad', file: 'TheWorldIsGoingMad.mp3', duration: '', lyrics: '', album: "olal" }
  ];

  dejameTrack: Track[] = [
    { title: 'Déjame', file: 'Dejame.mp3', duration: '', lyrics: '', album: "dejame" }
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadSongDurations();
    this.loadLyrics();

    // Update realtime the current time of the song
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.formatTime(this.audio.currentTime);
      this.totalTime = this.formatTime(this.audio.duration || 0);

      const progressBar = document.querySelector('.progress-input') as HTMLInputElement;
      if (progressBar) {
        progressBar.value = this.audio.currentTime.toString();
      }
    });

    // Reset the times when the song ends
    this.audio.addEventListener('ended', () => {
      this.currentTime = '0:00';
      this.totalTime = '0:00';
    });
  }

  ngAfterViewInit(): void {
    this.loadTooltips();
  }

  ngOnDestroy(): void {
    this.togglePlayPause();
  }

  /**
   * Function to load the tooltips for the audio player controls.
   */
  loadTooltips(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => 
      new (window as any).bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  /**
   * Function to load the duration of all songs.
   */
  loadSongDurations(): void {
    this.loadTrackDurations(this.momentosTracks, 'momentos');
    this.loadTrackDurations(this.vivirTracks, 'vivir');
    this.loadTrackDurations(this.olalTracks, 'olal');
    this.loadTrackDurations(this.dejameTrack, 'dejame');
  }

  /**
   * Generic function to load the duration of songs for a given track list and folder.
   */
  loadTrackDurations(trackList: any[], folder: string): void {
    trackList.forEach(song => {
      const audio = new Audio(`${this.basePath}${folder}/tracks/${song.file}`);
      audio.addEventListener('loadedmetadata', () => {
        song.duration = this.formatTime(audio.duration);
      });
    });
  }

  /**
   * Function to load the lyrics of all songs.
   */
  loadLyrics(): void {
    Promise.all([
      this.loadTrackLyrics(this.momentosTracks, 'momentos'),
      this.loadTrackLyrics(this.vivirTracks, 'vivir'),
      this.loadTrackLyrics(this.olalTracks, 'olal'),
      this.loadTrackLyrics(this.dejameTrack, 'dejame')
    ]).then(() => {
      console.log('All Lyrics loaded!');
    });
  }

  /**
   * Generic function to load the lyrics of songs for a given track list and folder.
   */
  loadTrackLyrics(trackList: any[], folder: string): Promise<void[]> {
    return Promise.all(
      trackList.map(track =>
        this.http.get(`${this.basePath}${folder}/lyrics/${track.file.replace('.mp3', 'Lyrics.txt')}`, 
          { responseType: 'text' })
          .toPromise()
          .then(lyrics => {
            track.lyrics = lyrics;
          })
          .catch(() => {
            track.lyrics = 'Lyrics not found';
          })
      )
    );
  }

  /**
   * Function to play a track
   * @param track - Track to play
   */
  playTrack(track: any): void {
    // Check if the selected track is the same as the one playing
    if (this.selectedTrack === track) {
      this.audio.pause();
      this.selectedTrack = { title: '', file: '', duration: 'Escoge una Canción', lyrics: '', album: '' };
      this.audio.src = '';
      this.playing = false;
      this.expandContainer = false;
    } else {
      // Play the selected track
      this.selectedTrack = track;
      this.audio.src = `${this.basePath}${this.selectedTrack.album}/tracks/${track.file}`;
      this.audio.load();
      this.audio.play();
      this.playing = true;
      this.expandContainer = true;
    }
  }

  /**
   * Function to toggle the play/pause of the audio player
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
   * Function to update the current time of the audio player
   * @param event - Event to update the current time
   */
  updateCurrentTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audio.currentTime = parseFloat(input.value);
    this.currentTime = this.formatTime(this.audio.currentTime);
  }

  /**
   * Function to format the time in the audio player
   * @param time - Time in seconds
   * @returns string - Time formatted
   */
  formatTime(time: number): string {
    if (isNaN(time) || !isFinite(time)) {
    return '0:00';
  }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  /**
   * Function to download a track
   * @param track - Track to download
   */
  downloadTrack(track: Track): void {
    const link = document.createElement('a');
    link.href = `${this.basePath}${track.album}/tracks/${track.file}`;
    link.download = track.file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}