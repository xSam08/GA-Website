import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-song-player',
  imports: [],
  templateUrl: './song-player.component.html',
  styleUrl: './song-player.component.css'
})
export class SongPlayerComponent {
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('errorToast', { static: false }) errorToast!: ElementRef;

  private basePath = 'assets/music/';
  album: string = '';
  song: string = '';
  songSrc: string = '';
  songsData: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    console.log('ToastrService inyectado:', this.toastr);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.album = params['album'];
      this.song = params['song'];

      // load the JSON file after the route params are set
      this.http.get<any>('assets/music/songs.json').subscribe(data => {
        this.songsData = data;
        this.setSongSrc();
      });
    });
  }

  private setSongSrc() {
    if (!this.songsData) return;

    const albumData = this.songsData[this.album];

    if (!albumData) {
      console.error('Álbum no encontrado:', this.album);
      this.toastr.error('Álbum no encontrado.', 'Error');
      return;
    }

    const songFileName = albumData[this.song];

    if (!songFileName) {
      console.error('Canción no encontrada:', this.song);
      this.toastr.error('Canción no encontrada.', 'Error');
      return;
    }

    this.songSrc = `${this.basePath}${this.album}/tracks/${songFileName}`;

    setTimeout(() => {
      if (this.audioPlayer) {
        this.audioPlayer.nativeElement.load();
        this.toastr.success('Canción cargada.', 'Éxito');
      }
    }, 100);
  }
}
