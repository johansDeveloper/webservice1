package com.istiak.stories.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.istiak.stories.StoriesApplication;
import com.istiak.stories.model.Story;
import com.istiak.stories.repository.StoryRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;

import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockHttpServletRequest;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author johansCaicedo
 */
@WebMvcTest(StoryController.class)
@ContextConfiguration(classes = StoriesApplication.class)
public class StoryControllerTest {

    @InjectMocks
    StoryController storyController;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    WebApplicationContext context;

    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    @Test
    public void createNoteTest() {

        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Story story = storyController.createNote(new Story());
        when(storyController.createNote(any(Story.class))).thenReturn(story);

        Story storyNew = new Story();
        ResponseEntity<Object> responseEntity = (ResponseEntity<Story>) storyController.save(storyNew);

    }

    @Test
    public void testFindAll() {
        Story story1 = new Story();
        story1.setTitle("title test 1");

        Story story2 = new Story();
        story2.setTitle("title test 2");

        List<Story> stories = new ArrayList<>();
        stories.set(1, story1);
        stories.set(2, story2);

        when(storyRepository.getAllStoriesSorted(null)).thenReturn(stories);

        List<Story> result = storyController.getAllNotes();

        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getTitle()).isEqualTo(story1.getTitle());
        assertThat(result.get(1).getTitle()).isEqualTo(story2.getTitle());
    }
}
