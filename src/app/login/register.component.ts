import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./login.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(function() {
      $(".preloader").fadeOut();
    });
    
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });
    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function() {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });
    }

}
