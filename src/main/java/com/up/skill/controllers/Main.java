package com.up.skill.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Multi Cabz on 9/21/2016.
 */
@Controller
public class Main {



    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String hello(){
        return "main/hellowWorld";
    }

}
