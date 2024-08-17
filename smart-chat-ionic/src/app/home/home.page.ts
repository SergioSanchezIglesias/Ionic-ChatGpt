import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Message } from "../interfaces/message.interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  messages: Message[] = [
    { sender: "me", content: "Hola como estás?" },
    { sender: "bot", content: "Bien, y tú como estás?" },
  ];

  form = new FormGroup({
    prompt: new FormControl(""),
  });

  loading: boolean = false;

  constructor() {}

  submit() {
    let prompt = this.form.value.prompt as string;

    //* Mensaje del usuario
    let userMsg: Message = { sender: "me", content: prompt };
    this.messages.push(userMsg);

    //* Mensaje del usuario
    let botMsg: Message = { sender: "bot", content: "" };
    this.messages.push(botMsg);

    this.form.reset();
    this.form.disable();

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.typeText("Estoy bien, y tú como estás?");
      this.form.enable();
    }, 2000);
  }

  typeText(text: string) {
    let textIndex = 0;
    let messagesLastIndex = this.messages.length - 1;
    let interval = setInterval(() => {
      if (textIndex < text.length) {
        this.messages[messagesLastIndex].content += text.charAt(textIndex);
        textIndex++;
      } else {
        clearInterval(interval);
      }
    }, 15);
  }
}
