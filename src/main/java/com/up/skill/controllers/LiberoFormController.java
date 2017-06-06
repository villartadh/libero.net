package com.up.skill.controllers;

import com.up.skill.models.LiberoFormModel;
import com.up.skill.models.LiberoFormRepository;
import com.up.skill.support.web.MessageHelper;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.validation.Valid;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;

/**
 * Created by JPMC-PC04 on 08/05/2017.
 */

@Controller
public class LiberoFormController {
    @Autowired
    LiberoFormRepository liberoFormRepository;

    @RequestMapping(value = "liberoForm")
    public  String form(){
        return "libero/index";
    }


//    @RequestMapping(value = "/successful")
//    public  String liberoForm(){
//        return "libero/thankYou";
//    }

    @RequestMapping(value = "/participantsList", method = RequestMethod.GET)
    public ModelAndView usersResponse(ModelAndView model){
        model.addObject("users", liberoFormRepository.findAll());
        model.setViewName("libero/participantsList");
        return model;
    }


    @RequestMapping(value = "/participant/{id}")
    public  String registrants(@PathVariable Long id, Model model){
        model.addAttribute("user", liberoFormRepository.findOne(id));
        return "libero/participant";
    }


    @RequestMapping(value = "/remove/{id}")
    public  String removeUser(@PathVariable Long id, Model model,RedirectAttributes ra ){

        model.addAttribute("user",liberoFormRepository.findOne(id));

        liberoFormRepository.delete(id);

        MessageHelper.addSuccessAttribute(ra, "successDelete.message");
        return "redirect:/participantsList";
    }

    @RequestMapping(value = "/update" ,method = RequestMethod.POST)
    public  void updateUser(@ModelAttribute @Valid LiberoFormModel registrants,
                            BindingResult bindingResult,
                            HttpServletResponse response
                            ,HttpServletRequest request
                            )throws  Exception{

            try {
                Writer out = response.getWriter();

                JSONObject resp = new JSONObject();

                String email = request.getParameter("email");
                String postcode = request.getParameter("postcode");
                String mobno = request.getParameter("mobno");
                String radios = request.getParameter("radios");

                LiberoFormModel update = liberoFormRepository.findByEmail(email);

                if (!bindingResult.hasErrors()) {


                    if (update == null) {
                        resp.put("message", "error");
                        resp.put("email", "Email don't match");

                    }else{
                        liberoFormRepository.save(registrants);
                        update.setEmail(email);
                        update.setPostcode(postcode);
                        update.setMobno(mobno);
                        update.setRadios(radios);
                        resp.put("message","success");
                    }

                } else {

                    resp.put("message", "error");

                    List<FieldError> errors = bindingResult.getFieldErrors();

                    for (FieldError result : errors) {
                        resp.put(result.getField(), result.getDefaultMessage());
                    }

                }

                response.setContentType("application/json");
                out.write(resp.toString());
            }catch(Exception ex){
                System.out.print(ex);
            }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void addUser(@ModelAttribute @Valid LiberoFormModel registrants,
                        BindingResult bindingResult,
                        HttpServletResponse response,
                        HttpServletRequest request){

        try{

            Writer out = response.getWriter();

            JSONObject obj = new JSONObject();
            String email = request.getParameter("email");

            LiberoFormModel validate = liberoFormRepository.findByEmail(email);

            if (!bindingResult.hasErrors()){

                if (validate == null) {
                    liberoFormRepository.save(registrants);
                    obj.put("message","success");
                }else{
                    obj.put("message", "error");
                    obj.put("email", "emailExist");
                }


            }else{
                obj.put("message","error");
                List<FieldError> errors = bindingResult.getFieldErrors();
                for (FieldError result : errors){
                    obj.put(result.getField(), result.getDefaultMessage());
                }
            }

            response.setContentType("application/json");
            out.write(obj.toString());

        }catch(Exception ex){
            System.out.print(ex);
        }
    }
}
