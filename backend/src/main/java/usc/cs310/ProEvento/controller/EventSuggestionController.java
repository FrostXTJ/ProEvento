package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.EventSuggestion;
import usc.cs310.ProEvento.model.requestbody.EventSuggestionRequestBody;
import usc.cs310.ProEvento.service.EventSuggestionService;

import java.util.List;

@RestController
public class EventSuggestionController {
    @Autowired
    private EventSuggestionService eventSuggestionService;

    @GetMapping("/api/suggestion")
    public EventSuggestion getSuggestionById(@RequestParam long suggestionId) {
        return eventSuggestionService.getEventSuggestionById(suggestionId);
    }

    @GetMapping("/api/suggestion/by_group_id")
    public List<EventSuggestion> getSuggestionsByGroupId(@RequestParam long groupId) {
        return eventSuggestionService.getEventSuggestionsByGroupId(groupId);
    }

    @GetMapping("/api/suggestion/ongoing_by_group_id")
    public List<EventSuggestion> getOngoingSuggestionsByGroupId(@RequestParam long groupId) {
        return eventSuggestionService.getOngoingEventSuggestionByGroupId(groupId);
    }

    @GetMapping("/api/suggestion/past_selected_by_group_id")
    public List<EventSuggestion> getPastSelectedSuggestionsByGroupId(@RequestParam long groupId) {
        return eventSuggestionService.getPastSelectedEventSuggestionByGroupId(groupId);
    }

    @PostMapping("/api/suggestion/create")
    public boolean createEventSuggestion(@RequestBody EventSuggestion suggestion) {
        return eventSuggestionService.createEventSuggestion(suggestion);
    }

    @PostMapping("/api/suggestion/vote")
    public boolean voteEventSuggestion(@RequestBody EventSuggestionRequestBody requestBody) {
        return eventSuggestionService.voteEventSuggestion(requestBody.userId, requestBody.eventSuggestionId);
    }

    @PostMapping("/api/suggestion/to_events")
    public boolean convertOngoingSuggestionsToEvents(@RequestParam long groupId) {
        return eventSuggestionService.convertOngoingSuggestionsToEvents(groupId);
    }
}
