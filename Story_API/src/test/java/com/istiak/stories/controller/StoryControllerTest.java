package com.istiak.stories.controller;

import com.istiak.stories.StoriesApplication;
import com.istiak.stories.model.Story;
import com.istiak.stories.repository.StoryRepository;
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
        Employee employee1 = new Employee(1, "Lokesh", "Gupta", "howtodoinjava@gmail.com");
        Employee employee2 = new Employee(2, "Alex", "Gussin", "example@gmail.com");
        Employees employees = new Employees();
        employees.setEmployeeList(Arrays.asList(employee1, employee2));

        when(employeeDAO.getAllEmployees()).thenReturn(employees);

        Employees result = employeeController.getEmployees();

        assertThat(result.getEmployeeList().size()).isEqualTo(2);
        assertThat(result.getEmployeeList().get(0).getFirstName()).isEqualTo(employee1.getFirstName());
        assertThat(result.getEmployeeList().get(1).getFirstName()).isEqualTo(employee2.getFirstName());
    }
}
