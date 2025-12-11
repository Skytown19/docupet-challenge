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

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}

async function submitPet($pet) {
    await fetch('/pet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify($pet)
    });
}

function domReady () {
    let pet = new Pet();

    // UI Elements;
    const petTypeDogButton = document.getElementById('petTypeDog');
    const petTypeCatButton = document.getElementById('petTypeCat');
    const petSexMaleButton = document.getElementById('petSexMale');
    const petSexFemaleButton = document.getElementById('petSexFemale');
    const petKnownDateOfBirthButton = document.getElementById('petKnownDateOfBirth');
    const petUnknownDateOfBirthButton = document.getElementById('petUnknownDateOfBirth');
    const mixedCheckbox = document.getElementById('mixedCheckbox');
    const backButton = document.getElementById('back');
    const datePicker = document.getElementById('petDatePicker');
    const mixedBreedInput = document.getElementById('mixedBreedInput');
    const approximateAgeInput = document.getElementById('petApproximateAge');

    // Event Listeners
    petTypeDogButton.addEventListener('click', () => {
        petTypeCatButton.classList.remove('selected');
        petTypeDogButton.classList.add('selected');
        pet.setType('Dog');
    });

    petTypeCatButton.addEventListener('click', () => {
        petTypeDogButton.classList.remove('selected');
        petTypeCatButton.classList.add('selected');
        pet.setType('Cat');
    });

    petSexMaleButton.addEventListener('click', () => {
        petSexFemaleButton.classList.remove('selected');
        petSexMaleButton.classList.add('selected');
        pet.setSex('Male');
    });

    petSexFemaleButton.addEventListener('click', () => {
        petSexMaleButton.classList.remove('selected');
        petSexFemaleButton.classList.add('selected');
        pet.setSex('Female');
    });

    petKnownDateOfBirthButton.addEventListener('click', () => {
        if (!petKnownDateOfBirthButton.classList.contains('selected')) {
            petUnknownDateOfBirthButton.classList.remove('selected');
            petKnownDateOfBirthButton.classList.add('selected');
            if (!approximateAgeInput.hasAttribute('hidden')){
                approximateAgeInput.toggleAttribute('hidden');
            }
            datePicker.toggleAttribute('hidden');
        }
    });

    petUnknownDateOfBirthButton.addEventListener('click', () => {
        if (!petUnknownDateOfBirthButton.classList.contains('selected')) {
            petKnownDateOfBirthButton.classList.remove('selected');
            petUnknownDateOfBirthButton.classList.add('selected');
            if (!datePicker.hasAttribute('hidden')){
                datePicker.toggleAttribute('hidden');
            }
            approximateAgeInput.toggleAttribute('hidden');
        }
    });

    mixedCheckbox.addEventListener('click', () => {
        document.getElementById('mixedBreedInput').toggleAttribute('hidden');
    });

    backButton.addEventListener('click', () => {
        document.getElementById('dangerousAnimalForm').toggleAttribute('hidden');
        document.getElementById('results').toggleAttribute('hidden');
    });

    document.getElementById('submit').addEventListener('click', () => {
        $pet.setType('Dog');
        $pet.setSex('Male');
        $pet.setName('Rudolph');
        $pet.setBreed('Poodle');
        $pet.setDateOfBirth('12-01-2023');
        submitPet($pet);
    });
}

if (document.readyState !== 'loading') {
    domReady();
} else {
    document.addEventListener('DOMContentLoaded', domReady)
}
