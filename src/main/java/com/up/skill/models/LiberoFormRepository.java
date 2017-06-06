package com.up.skill.models;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by JPMC-PC04 on 09/05/2017.
 */
public interface LiberoFormRepository extends JpaRepository<LiberoFormModel, Long> {
    LiberoFormModel findByEmail(String email);
//    LiberoFormModel findByPostcode(String postcode);
//    LiberoFormModel findByMobno(String mobno);
//    LiberoFormModel findByRadios(String radios);
}
