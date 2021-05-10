package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.EventDao;
import usc.cs310.ProEvento.dao.EventSuggestionDao;
import usc.cs310.ProEvento.dao.UserDao;
import usc.cs310.ProEvento.model.Event;
import usc.cs310.ProEvento.model.EventSuggestion;
import usc.cs310.ProEvento.model.User;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventSuggestionService {
    @Autowired
    private EventSuggestionDao eventSuggestionDao;

    @Autowired
    private EventDao eventDao;

    @Autowired
    private UserDao userDao;

    public boolean createEventSuggestion(EventSuggestion eventSuggestion) {
        eventSuggestion.setVoters(new HashSet<>());
        eventSuggestion.setStatus("ongoing");
        return eventSuggestionDao.createEventSuggestion(eventSuggestion);
    }

    public boolean voteEventSuggestion(long userId, long eventSuggestionId) {
        User user = userDao.selectUserById(userId);
        EventSuggestion suggestion = eventSuggestionDao.selectEventSuggestionById(eventSuggestionId);
        if (user != null && suggestion != null) {
            suggestion.vote(user);
        }
        return eventSuggestionDao.updateEventSuggestion(suggestion);
    }

    public boolean convertOngoingSuggestionsToEvents(long groupId) {
        List<EventSuggestion> ongoingSuggestions = getOngoingEventSuggestionByGroupId(groupId);
        PriorityQueue<EventSuggestion> selected = new PriorityQueue<>(
                Comparator.comparingInt(EventSuggestion::getVotes)
        );
        int k = Math.min(ongoingSuggestions.size(), 3);
        for (int i = 0; i < k; i++) {
            selected.offer(ongoingSuggestions.get(i));
        }
        for (int i = k; i < ongoingSuggestions.size(); i++) {
            EventSuggestion suggestion = ongoingSuggestions.get(i);
            if (suggestion.getVotes() > selected.peek().getVotes()) {
                selected.offer(suggestion);
            }
        }
        boolean success = true;
        while (!selected.isEmpty()) {
            EventSuggestion suggestion = selected.poll();
            suggestion.setStatus("selected");
            Event event = new Event();
            event.setName(suggestion.getName());
            event.setCoverImageUrl("");
            event.setDescription(suggestion.getDescription());
            event.setTag(suggestion.getTag());
            event.setHashtags(suggestion.getHashtags());
            event.setStatus("open for registration");
            event.setHost(suggestion.getUserGroup().getFounder());
            event.setDateTime(suggestion.getDateTime());
            success &= eventSuggestionDao.updateEventSuggestion(suggestion) &&
                    eventDao.createEvent(event);
        }
        return success;
    }

    public EventSuggestion getEventSuggestionById(long suggestionId) {
        return eventSuggestionDao.selectEventSuggestionById(suggestionId);
    }

    public List<EventSuggestion> getEventSuggestionsByGroupId(long groupId) {
        return eventSuggestionDao.selectEventSuggestionsByGroupId(groupId);
    }

    public List<EventSuggestion> getOngoingEventSuggestionByGroupId(long groupId) {
        return eventSuggestionDao.selectEventSuggestionsByGroupId(groupId)
                .stream().filter(suggestion -> suggestion.getStatus().equals("ongoing"))
                .collect(Collectors.toList());
    }

    public List<EventSuggestion> getPastSelectedEventSuggestionByGroupId(long groupId) {
        return eventSuggestionDao.selectEventSuggestionsByGroupId(groupId)
                .stream().filter(suggestion -> suggestion.getStatus().equals("selected"))
                .collect(Collectors.toList());
    }
}
