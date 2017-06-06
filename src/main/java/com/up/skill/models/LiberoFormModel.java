package com.up.skill.models;

import com.up.skill.signup.SignupForm;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

/**
 * Created by JPMC-PC04 on 09/05/2017.
 */

@Entity
@Table(name = "respondents")
public class LiberoFormModel {

    private static final String NOT_BLANK_MESSAGE = "{emptyFields.message}";
    private static final String EMAIL_MESSAGE = "{e-mail.message}";

   @Id
   @GeneratedValue
    private Long id;

    @NotEmpty(message = LiberoFormModel.NOT_BLANK_MESSAGE)
    private String postcode;

    @NotEmpty (message = LiberoFormModel.NOT_BLANK_MESSAGE)
    @Email(message = LiberoFormModel.EMAIL_MESSAGE)
    private String email;

    @NotEmpty (message = LiberoFormModel.NOT_BLANK_MESSAGE)
    private String mobno;

    @NotEmpty (message = LiberoFormModel.NOT_BLANK_MESSAGE)
    private String radios;

    private Instant created;

    public LiberoFormModel() {
        this.created = Instant.now();
    }

    public String getRadios() {
        return radios;
    }

    public void setRadios(String radios) {
        this.radios = radios;
    }

    public String getMobno() {
        return mobno;
    }

    public void setMobno(String mobno) {
        this.mobno = mobno;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getCreated() {
        return created;
    }

}