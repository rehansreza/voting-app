import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Polls } from '../polls.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrl: './poll.css',
})
export class Poll implements OnInit {
  newPoll: Polls = {
    question: '',
    options: [
      { optionText: '', voteCount: 0 },
      { optionText: '', voteCount: 0 }
    ]
  };


  polls: Polls[] = [];
  constructor(private pollService: PollService) { }

  ngOnInit(): void {
    this.loadPolls();
  }


  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.log("Error Fetching Polls :", error);
      }
    })
  }

  trackByIndex(index: number):number{
    return index;
  }

  vote(pollId:number, optionIndex:number){
    this.pollService.vote(pollId,optionIndex)
    .subscribe({
      next: () => {
        const poll =this.polls.find(p=>p.id===pollId);
        if(poll){
          poll.options[optionIndex].voteCount++;
        }
      },
      error: (error) => {
        console.log("Error Voting on a Polls :", error);
      }
    })
  }

  createPoll(form:any) {
    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
        form.resetForm();  
      },
      error: (error) => {
        console.log("Error Creating on a Polls :", error);
      }
    });
  }

  resetPoll() {
    this.newPoll = {
      question: '',
      options: [
        { optionText: '', voteCount: 0 },
        { optionText: '', voteCount: 0 }
      ]
    };
  }

  addOption() {
  this.newPoll.options.push({ optionText: '', voteCount: 0 });
}

removeOption(index: number) {
  this.newPoll.options.splice(index, 1);
}

}
