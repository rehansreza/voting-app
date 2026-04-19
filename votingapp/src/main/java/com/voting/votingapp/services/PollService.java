package com.voting.votingapp.services;

import com.voting.votingapp.model.OptionVote;
import com.voting.votingapp.model.Poll;
import com.voting.votingapp.repositories.PollRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private final PollRepository pollRepository;
    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    @Transactional
    public void createPol(Poll poll) {
        pollRepository.save(poll);
        pollRepository.flush();

    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollsById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        //Get Poll from DB
        Poll poll =pollRepository.findById(pollId)
                .orElseThrow( ()->new RuntimeException("Poll not found"));
        //Get All options
        List<OptionVote> options =poll.getOptions();
        //If index of vote is not valid, throw error
        if(optionIndex < 0 || optionIndex >=options.size() )
            throw new IllegalArgumentException("Invalid Index");
        //Get Selected Options
        OptionVote selectedOptions= options.get(optionIndex);
        //Increment vote for selected options
        selectedOptions.setVoteCount(selectedOptions.getVoteCount() +1);
        //save Increment options into DB
        pollRepository.save(poll);
    }
}
