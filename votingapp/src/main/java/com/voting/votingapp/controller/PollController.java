package com.voting.votingapp.controller;

import com.voting.votingapp.model.Vote;
import com.voting.votingapp.services.PollService;
import com.voting.votingapp.model.Poll;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost")
@RequestMapping(value = "/api/polls", method = RequestMethod.OPTIONS)
public class PollController {
    private final PollService pollService;
    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public void createPol(@RequestBody Poll poll){
        pollService.createPol(poll);
    }

    @GetMapping
    public List<Poll> getAllPolls(){return pollService.getAllPolls();}

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollsById(@PathVariable Long id){
            return pollService.getPollsById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/vote")
    public void vote(@RequestBody Vote vote){
             pollService.vote(vote.getPollId(),vote.getOptionIndex());
    }
}
