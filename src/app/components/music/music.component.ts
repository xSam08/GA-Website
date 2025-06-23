// Import Angular modules
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

// Import the TranslateModule to use the translate pipe
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

// Interface to define the Track object
interface Track {
  title: string;
  file: string;
  duration: string | null;
  lyrics?: string;
  album: string;
}

// Interface to define the PlayerState object
interface PlayerState {
  selectedTrack: Track | null;
  expandContainer: boolean;
  playing: boolean;
  isLocked: boolean;
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})

/**
 * Music component that provides an interactive audio player with track selection, playback control, 
 * lyrics display, and downloading functionality.
 * It dynamically loads track durations and lyrics from local assets, updates playback progress in 
 * real-time, and ensures a smooth user experience.
 * The component also manages UI interactions, such as expanding track containers, toggling playback, 
 * and updating tooltips.
 * It integrates with ngx-translate for multilingual support and uses HttpClient to fetch lyrics from 
 * text files.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class MusicComponent implements AfterViewInit {

  // Index signature to allow dynamic properties in togglePlayPause function
  [key: string]: any;

  // Declaration of the variables used in the component
  private basePath = 'assets/music/';
  public audio: HTMLAudioElement = new Audio(); // Global audio player
  public currentTime = '0:00';
  public totalTime = '0:00';
  public tooltips: any = {};
  public lockedPlayer: any;
  public showButtons: boolean = false;

  // Use the PlayerState interface to define the player state for each album
  momentosPlayer: PlayerState = { selectedTrack: null, expandContainer: false, playing: false, isLocked: false };
  vivirPlayer: PlayerState = { selectedTrack: null, expandContainer: false, playing: false, isLocked: false };
  olalPlayer: PlayerState = { selectedTrack: null, expandContainer: false, playing: false, isLocked: false };
  dejamePlayer: PlayerState = { selectedTrack: null, expandContainer: false, playing: false, isLocked: false };
  po2duetPlayer: PlayerState = { selectedTrack: null, expandContainer: false, playing: false, isLocked: false };
  otherPlayer: PlayerState = { selectedTrack: null, expandContainer: false, playing: false, isLocked: false };

  // Declaration of the tracks for each album
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

  po2duetoTrack: Track[] = [
    { title: 'You are the sunshine of my life', file: 'YouAreTheSunshineOfMyLife.mp3', duration: '', album: "po2-d" },
    { title: 'Besame mucho', file: 'BesameMucho.mp3', duration: '', album: "po2-d" },
    { title: 'Fly me to the moon', file: 'FlyMeToTheMoon.mp3', duration: '', album: "po2-d" },
    { title: 'Over the rainbow', file: 'OverTheRainbow.mp3', duration: '', album: "po2-d" },
    { title: 'Cant but me love', file: 'CantBuyMeLove.mp3', duration: '', album: "po2-d" },
    { title: 'Scarborough fair', file: 'ScarboroughFair.mp3', duration: '', album: "po2-d" },
    { title: 'Something in the way', file: 'SomethingInTheWay.mp3', duration: '', album: "po2-d" },
    { title: 'Wiskey Lulaby', file: 'WiskeyLulaby.mp3', duration: '', album: "po2-d" },
    { title: 'Edelwais', file: 'Edelwais.mp3', duration: '', album: "po2-d" },
    { title: 'Strangers in the Night', file: 'StrangersInTheNight.mp3', duration: '', album: "po2-d" },
    { title: 'What a wonderful world', file: 'WhatAWonderfulWorld.mp3', duration: '', album: "po2-d" },
    { title: 'Ill fly away', file: 'IllFlyAway.mp3', duration: '', album: "po2-d" },
    { title: 'Danny boy', file: 'DannyBoy.mp3', duration: '', album: "po2-d" },
    { title: 'Yesterday', file: 'Yesterday.mp3', duration: '', album: "po2-d" },
    { title: 'Cant take my eyes of you', file: 'CantTakeMyEyesOfYou.mp3', duration: '', album: "po2-d" },
    { title: 'Aint no sunshine', file: 'AintNoSunshine.mp3', duration: '', album: "po2-d" },
    { title: 'Something Stupid', file: 'SomethingStupid.mp3', duration: '', album: "po2-d" },
    { title: 'Sounds of silence', file: 'SoundsOfSilence.mp3', duration: '', album: "po2-d" },
    { title: 'Dream a little dream of me', file: 'DreamALittleDreamOfMe.mp3', duration: '', album: "po2-d" },
    { title: 'Sway', file: 'Sway.mp3', duration: '', album: "olal" },
  ];

  otherTrack: Track[] = [
    { title: 'Primera cancion a Beatriz', file: 'PrimeraCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Segunda cancion a Beatriz', file: 'SegundaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Tercera cancion a Beatriz', file: 'TerceraCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Cuarta cancion a Beatriz', file: 'CuartaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Quinta cancion a Beatriz', file: 'QuintaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Sexta cancion a Beatriz', file: 'SextaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Septima cancion a Beatriz', file: 'SeptimaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Octava cancion a Beatriz', file: 'OctavaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Novena cancion a Beatriz', file: 'NovenaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Decima cancion a Beatriz', file: 'DecimaCancionABeatriz.mp3', duration: '', album: "other" },
    { title: 'Cuando vayas a mi pueblo', file: 'CuandoVayasAMiPueblo.mp3', duration: '', album: "other" },
    { title: 'Que ha sido de tu vida', file: 'QueHaSidoDeTuVida.mp3', duration: '', album: "other" },
    { title: 'Una carrera sin final', file: 'UnaCarreraSinFinal.mp3', duration: '', album: "other" },
    { title: 'Enredado en tu recuerdo', file: 'EnredadoEnTuRecuerdo.mp3', duration: '', album: "other" },
    { title: 'Conversando con la vida', file: 'ConversandoConLaVida.mp3', duration: '', album: "other" },
    { title: 'Musico poeta', file: 'MusicoPoeta.mp3', duration: '', album: "other" },
    { title: 'Dime papa Ana Maria', file: 'DimePapaAnaMaria.mp3', duration: '', album: "other" },
    { title: 'Soy pirata', file: 'SoyPirata.mp3', duration: '', album: "other" },
    { title: 'Un alto en el andar', file: 'UnAltoEnElAndar.mp3', duration: '', album: "other" },
    { title: 'Daniela', file: 'Daniela.mp3', duration: '', album: "other" },
    { title: 'Colegio los Nogales', file: 'ColegioLosNogales.mp3', duration: '', album: "other" },
    { title: 'Volver a Bayamo', file: 'VolverABayamo.mp3', duration: '', album: "other" },
    { title: 'Años y años atras', file: 'YearsAndYearsBack.mp3', duration: '', album: "other" },
    { title: 'Baila conmigo', file: 'BailaConmigo.mp3', duration: '', album: "other" },
    { title: 'Todos uno con la tierra', file: 'TodosUnoConLaTierra.mp3', duration: '', album: "other" },
    { title: 'Uno mas uno', file: 'UnoMasUno.mp3', duration: '', album: "other" },
    { title: 'Se van', file: 'SeVan.mp3', duration: '', album: "other" },
    { title: 'Toma mi mano Voice Ana Maria', file: 'TomaMiManoVoiceAMaria.mp3', duration: '', album: "other" },
    { title: 'A million years ago', file: 'AMillionYearsAgo.mp3', duration: '', album: "other" },
    { title: 'My friend this is heaven', file: 'MyFriendThisIsHeaven.mp3', duration: '', album: "other" },
    { title: 'Tell me that you love me', file: 'TellMeThatYouLoveMe.mp3', duration: '', album: "other" },
    { title: 'Look at her', file: 'LookAtHer.mp3', duration: '', album: "other" },
    { title: 'Do we dare', file: 'DoWeDare.mp3', duration: '', album: "other" },
    { title: 'This ones for you', file: 'ThisOnesForYou.mp3', duration: '', album: "other" },
    { title: 'El arbol de la vida', file: 'ElArbolDeLaVida.mp3', duration: '', album: "other" },
    { title: 'Un nuevo comenzar', file: 'UnNuevoComenzar.mp3', duration: '', album: "other" },
    { title: 'En espera de palabras', file: 'EnEsperaDePalabras.mp3', duration: '', album: "other" },
    { title: 'Huellas en la arena', file: 'HuellasEnLaArena.mp3', duration: '', album: "other" },
    { title: 'Mariposa', file: 'Mariposa.mp3', duration: '', album: "other" },
    { title: 'Shekina', file: 'Shekina.mp3', duration: '', album: "other" },
    { title: 'Eternity', file: 'Eternity.mp3', duration: '', album: "other" }
  ];


  /**
   * Constructor of the component
   * @param http - HttpClient to make requests to the server
   * @param languageService - LanguageService to manage the translations
   */
  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}


  /**
   * Function invoked when the component is initialized
   * This function loads the song durations and the lyrics of all songs
   * It also subscribes to the language changes to load the translations, updates the current
   * time of the song in realtime and resets the times when the song ends
   * @returns void
   */
  ngOnInit(): void {
    this.loadSongDurations();
    this.loadLyrics();

    this.languageService.langChanged$.subscribe(() => {
      this.loadTranslations();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.formatTime(this.audio.currentTime);
      this.totalTime = this.formatTime(this.audio.duration || 0);

      const progressBar = document.querySelector('.progress-input') as HTMLInputElement;
      if (progressBar) {
        progressBar.value = this.audio.currentTime.toString();
      }
    });

    this.audio.addEventListener('ended', () => {
      // this.playing = false;
    });

    // this.audio.addEventListener('play', () => {
    //
    // });
  }


  /**
   * Function invoked after the view is initialized
   * This function refreshes the tooltips when the view is initialized
   * @returns void
   */
  ngAfterViewInit(): void {
    this.refreshTooltips();
  }


  /**
   * Function invoked when the component is destroyed
   * This function stops the audio player if it is playing
   * @returns void
   */
  ngOnDestroy(): void {
    this.togglePlayPause();
  }


  /**
   * Function to load the duration of all songs.
   * This function uses the Audio object to load the duration of the songs.
   * @returns void
   */
  loadSongDurations(): void {
    this.loadTrackDurations(this.momentosTracks, 'momentos');
    this.loadTrackDurations(this.vivirTracks, 'vivir');
    this.loadTrackDurations(this.olalTracks, 'olal');
    this.loadTrackDurations(this.dejameTrack, 'dejame');
    this.loadTrackDurations(this.po2duetoTrack, 'po2-d');
    this.loadTrackDurations(this.otherTrack, 'other');
  }


  /**
   * Generic function to load the duration of songs for a given track list and folder.
   * @param trackList - List of tracks to load the duration
   * @param folder - Folder where the tracks are located
   * @returns void
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
   * This function uses the HttpClient to make requests to the server and load the lyrics of the songs.
   * The lyrics are loaded from the Lyrics.txt file located in the lyrics folder of each album.
   * @returns void
   */
  loadLyrics(): void {
    Promise.all([
      this.loadTrackLyrics(this.momentosTracks, 'momentos'),
      this.loadTrackLyrics(this.vivirTracks, 'vivir'),
      this.loadTrackLyrics(this.olalTracks, 'olal'),
      this.loadTrackLyrics(this.dejameTrack, 'dejame'),
      this.loadTrackLyrics(this.otherTrack, 'other')
    ]).then(() => {
      console.log('All Lyrics loaded!');
    });
  }


  /**
   * Generic function to load the lyrics of songs for a given track list and folder.
   * @param trackList - List of tracks to load the lyrics
   * @param folder - Folder where the tracks are located
   * @returns Promise<void[]> - Promise to load the lyrics of all tracks
   * @throws - This function throws an error if the lyrics are not found
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
   * This function plays the track in the audio player and expands the container of the track
   * @param track - Track to play
   * @param container - Container to expand
   * @returns void
   */
  playTrack(player: string, track?: any): void {

    if (!track) {
      this.resetPlayerState(player);
      this.restartExpandContainers(player);
      this.unlockPlayers(player);
      return;
    }

    const currentPlayer = this[player + 'Player'];

    if (currentPlayer.selectedTrack === track) {   // If the same track is selected, stop the audio player
      this.resetPlayerState(player);
      this.restartExpandContainers(player);
      this.unlockPlayers(player);
    } else {                              // If a different track is selected, play the track
      this.resetAllPlayers();
      this.loadTrack(track, player);
      this.restartExpandContainers(player);
      this.expandContainerToggle(player);
    }
  }


  /**
   * Function to reset all players
   * This function resets all players to their default state
   * @returns void
   */
  resetAllPlayers(): void {
    // Reset all players to their default state
    this.resetPlayerState('momentos');
    this.resetPlayerState('vivir');
    this.resetPlayerState('olal');
    this.resetPlayerState('dejame');
    this.resetPlayerState('po2duet');
    this.resetPlayerState('other');

    // Reset the audio player
    this.audio.src = '';
    this.audio.pause();
  }


  /**
   * Function to reset the selected track
   * @param container - The player container to reset
   * @returns void
   */
  private resetPlayerState(player: string): void {
    const currentPlayer = this[player + 'Player'];

    currentPlayer.selectedTrack = null;
    currentPlayer.expandContainer = false;
    currentPlayer.playing = false;
    this.showButtons = false;

    this.audio.src = '';
    this.audio.pause();
  }


  /**
   * Function to load a track in the audio player
   * This function loads the track in the audio player and plays it
   * @param track - Track to load
   * @param player - Name of the player (e.g., 'momentos', 'vivir', etc.)
   * @returns void
   */
  private loadTrack(track: any, player: string): void {
    const currentPlayer = this[player + 'Player'];

    // Block other players
    this.lockPlayers(player);

    // Show control buttons
    this.showButtons = true;

    // Set the track to the selected player
    currentPlayer.selectedTrack = track;

    // Set the audio source and play
    if (currentPlayer.selectedTrack) {
      this.audio.src = `${this.basePath}${currentPlayer.selectedTrack.album}/tracks/${track.file}`;
      this.audio.load();
      this.audio.play();
      currentPlayer.playing = true;
    }
  }


  /**
   * Function to lock other players when a song is loaded in a specific player
   * @param player - The player that is currently being used
   */
  private lockPlayers(player: string): void {
    const players = ['momentos', 'vivir', 'olal', 'dejame', 'po2duet', 'other'];

    for (const key of players) {
      if (key !== player) {
        this[key + 'Player'].isLocked = true;
      }
    }

    switch (player) {
      case 'momentos':
        this.lockedPlayer = "Momentos";
        break;
      case 'vivir':
        this.lockedPlayer = "Vivir";
        break;
      case 'olal':
        this.lockedPlayer = "Of Life and Love";
        break;
      case 'dejame':
        this.lockedPlayer = "Déjame";
        break;
      case 'po2duet':
        this.lockedPlayer = "Power of Two - Duet";
        break;
      case 'other':
        this.lockedPlayer = "Additional Songs";
        break;
    }
  }


  /**
   * Function to unlock other players
   * @param player - The player that is currently being used
   */
  private unlockPlayers(player: string): void {
    const players = ['momentos', 'vivir', 'olal', 'dejame', 'po2duet', 'other'];

    for (const key of players) {
      if (key !== player) {
        this[key + 'Player'].isLocked = false;
      }
    }
  }


  /**
   * Function to restart expand containers
   * @param container - The player container to reset
   * @returns void
   */
  restartExpandContainers(container: string): void {
    const currentContainer = this[container + 'Player'];
    currentContainer.expandContainer = false;
  }


  /**
   * Function to expand the container of a given track
   * @param container - Container to expand
   * @returns void
   */
  expandContainerToggle(container: string): void {
    const currentContainer = this[container + 'Player'];
    currentContainer.expandContainer = !currentContainer.expandContainer;
  }


  /**
   * Function to interact with the play/pause buttons of the audio player
   * @param player - The player to control (optional). If not provided, stop the music for all players.
   * @returns void
   */
  togglePlayPause(player?: string): void {
    if (player) {
      const currentPlayer = this[player + 'Player'];
      if (currentPlayer.playing) {
        this.audio.pause();
        currentPlayer.playing = false;
      } else {
        this.audio.play();
        currentPlayer.playing = true;
      }
    } else {
      this.audio.pause();
    }
  }


  /**
   * Function to update the current time of the audio player
   * This function updates the current time of the audio player when the user 
   * interacts with the progress bar of the audio player
   * @param event - Event to update the current time
   * @returns void
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
   * This function downloads the track when the user clicks on the download button
   * @param track - Track to download
   * @returns void
   */
  downloadTrack(track: Track): void {
    const link = document.createElement('a');
    link.href = `${this.basePath}${track.album}/tracks/${track.file}`;
    link.download = track.file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  /**
   * Function to load the translations of the tooltips
   * This function loads the translations of the tooltips when the language changes
   * @returns void
   */
  loadTranslations(): void {
    const keys = [
      'TOOLTIP_SPOTIFY',
      'TOOLTIP_YOUTUBE',
      'TOOLTIP_DEEZER',
      'TOOLTIP_BANDCAMP',
      'TOOLTIP_AMAZON',
      'TOOLTIP_APPLE',
      'TOOLTIP_DOWNLOAD',
      'TOOLTIP_STOP',
      'TOOLTIP_RESUME'
    ];
    this.languageService.getTranslations(keys).subscribe(translations => {
      this.tooltips = translations;
      this.refreshTooltips();
    });
  }


  /**
   * Function to refresh the tooltips
   * This function refreshes the tooltips when the language changes
   * @returns void
   */
  refreshTooltips(): void {
    setTimeout(() => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 100);
  }
}