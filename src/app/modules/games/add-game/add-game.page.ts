import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {
  gameForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }


  generateGameForm() {
    this.gameForm = this.fb.group({
      name: [null, Validators.required],
      time:  [null, Validators.required],
      result: [null,Number]
    })
  }
}
