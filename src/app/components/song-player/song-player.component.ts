// Angular imports
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Import ngx-toastr for notifications
import { ToastrService } from 'ngx-toastr';

// Import the language service and TranslateModule for translations
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-song-player',
  imports: [
    TranslateModule
  ],
  templateUrl: './song-player.component.html',
  styleUrl: './song-player.component.css'
})

/**
 * SongPlayer component that provides an interactive audio player for streaming songs from a specified album.
 * It retrieves song data from a JSON file, dynamically sets the audio source, and manages error handling.
 * The component supports multilingual notifications using ngx-toastr and ngx-translate for improved 
 * user experience.
 * 
 * Features:
 * - Retrieves album and song information from the URL parameters.
 * - Loads song metadata from a JSON file stored in the assets directory.
 * - Displays success and error messages for missing albums or songs.
 * - Supports language selection for notifications (English and Spanish).
 * - Automatically loads the selected song into an HTML5 audio player.
 * 
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class SongPlayerComponent {

  // ViewChild decorators to get references to the audio player and the error toast
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('errorToast', { static: false }) errorToast!: ElementRef;

  // Base path for the music files and different properties
  private basePath = 'assets/music/';
  album: string = '';
  song: string = '';
  songSrc: string = '';
  songsData: any;
  errorMessage: string = '';
  lang: 'es' | 'en';

  // Translations for the notifications
  private translations = {
    es: {
      albumNotFound: 'Álbum no encontrado.',
      songNotFound: 'Canción no encontrada.',
      songLoaded: 'Canción cargada.',
      success: 'Éxito'
    },
    en: {
      albumNotFound: 'Album not found.',
      songNotFound: 'Song not found.',
      songLoaded: 'Song loaded.',
      success: 'Success'
    }
  };


  /**
   * Constructor for the component
   * @param route - ActivatedRoute to get the parameters from the URL
   * @param http - HttpClient to make requests to the server
   * @param toastr - ToastrService to show notifications
   * @param languageService - LanguageService to get the current language
   */
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private languageService: LanguageService
  ) {
    const storedLang = this.languageService.getCurrentLang();
    this.lang = storedLang === 'en' ? 'en' : 'es';
  }


  /**
   * Method invoked when the component is initialized
   * It subscribes to the route parameters and gets the album and song names
   * Then, it makes a request to the server to get the songs data and sets the song source.
   * @returns void
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.album = params['album'];
      this.song = params['song'];

      this.http.get<any>('assets/music/songs.json').subscribe(data => {
        this.songsData = data;
        this.setSongSrc();
      });
    });
  }


  /**
   * Function to set the song source
   * It gets the song file name from the songs data and sets the source of the audio player
   * If the song or album is not found, it shows an error notification
   * If the song is found, it shows a success notification
   * If the audio player is available, it loads the song after 100ms
   * @returns void
   */
  private setSongSrc(): void {
    if (!this.songsData) return;

    const albumData = this.songsData[this.album];

    if (!albumData) {
      this.toastr.error(this.translations[this.lang].albumNotFound, 'Error');
      return;
    }

    const songFileName = albumData[this.song];

    if (!songFileName) {
      this.toastr.error(this.translations[this.lang].songNotFound, 'Error');
      return;
    }

    this.songSrc = `${this.basePath}${this.album}/tracks/${songFileName}`;

    setTimeout(() => {
      if (this.audioPlayer) {
        this.audioPlayer.nativeElement.load();
        this.toastr.success(
          this.translations[this.lang].songLoaded,
          this.translations[this.lang].success
        );
      }
    }, 100);
  }
}
