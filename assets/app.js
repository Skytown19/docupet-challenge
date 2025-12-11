import './stimulus_bootstrap.js';
import 'flowbite';

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

class Pet {
    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    setSex(sex) {
        this.sex = sex;
    }

    getSex() {
        return this.sex;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getBreed() {
        return this.breed;
    }

    setBreed(breed) {
        this.breed = breed;
    }

    getDateOfBirth(dateOfBrith) {
        return this.dateOfBirth;
    }

    setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}

function submitPet($pet) {
    $.post("pet", $pet).done((data) => {
        $("#dangerousAnimalForm").attr("hidden", true);
        $("#petNameResult").text(data.name);
        $("#petTypeResult").text(data.type);
        $("#petBreedResult").text(data.breed.join(", "));
        $("#petSexResult").text(data.sex);
        $("#petDateOfBirthResult").text(data.dateOfBirth);
        $("#results").removeAttr("hidden");
    });
}

$(document).ready(function() {
    let $pet = new Pet();
    // jQuery code
    $("#petTypeDog").on("click", () => {
        $("#petTypeDog").addClass('selected');
        $("#petTypeCat").removeClass('selected');
        $pet.setType('Dog');
    });

    $("#petTypeCat").on("click", () => {
        $("#petTypeCat").addClass('selected');
        $("#petTypeDog").removeClass('selected');
        $pet.setType('Cat');
    });

    $("#petSexMale").on("click", () => {
        $("#petSexMale").addClass('selected');
        $("#petSexFemale").removeClass('selected');
        $pet.setSex('Male');
    });

    $("#petSexFemale").on("click", () => {
        $("#petSexFemale").addClass('selected');
        $("#petSexMale").removeClass('selected');
        $pet.setSex('Female');
    });

    $("#mixedCheckbox").on("click", () => {
        console.log('SO CLOSE');
        const mixedCheckbox = document.getElementById('mixedCheckbox');
        const mixedBreedInput = document.getElementById('mixedBreedInput');
        mixedBreedInput.toggleAttribute('hidden');
    });

    $("#submit").on("click", () => {
        $pet.setName($("#petName").val());
        $pet.setBreed($("#petBreed").val());
        $pet.setDateOfBirth($("#petAge").val());

        submitPet({
            "name": $pet.getName(),
            "type": $pet.getType(),
            "sex": $pet.getSex(),
            "breed": $pet.getBreed(),
            "date_of_birth": $pet.getDateOfBirth()
        });
    })
});
