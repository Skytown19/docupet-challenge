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

function submitPet($pet) {
    return fetch('/pet', {
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
    const mixedRadio = document.getElementById('mixedRadio');
    const unknownRadio = document.getElementById('unknownRadio');
    const backButton = document.getElementById('back');
    const datePicker = document.getElementById('petDatePicker');
    const petBreedDropdown = document.getElementById('petBreed');
    const breedRadioButtons = document.getElementById('customBreedContainer');
    const mixedBreed = document.getElementById('mixedBreed');
    const mixedBreedInput = document.getElementById('petMixedBreed');
    const approximateAgeContainer = document.getElementById('approximateAge');
    const approximateAgeInput = document.getElementById('petApproximateAge');
    const dangerousBreedElement = document.getElementById('isDangerousAnimal');

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
            if (!approximateAgeContainer.hasAttribute('hidden')){
                approximateAgeContainer.toggleAttribute('hidden');
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
            approximateAgeContainer.toggleAttribute('hidden');
        }
    });

    mixedRadio.addEventListener('click', () => {
        mixedBreed.toggleAttribute('hidden');
    });

    unknownRadio.addEventListener('click', () => {
        if (!mixedBreed.hasAttribute('hidden')) {
            mixedBreed.toggleAttribute('hidden');
        }
    });

    petBreedDropdown.onchange = () => {
        if (petBreedDropdown.value === 'idk') {
            breedRadioButtons.toggleAttribute('hidden');
            return;
        }

        // Only toggle hidden if element is not already hidden
        if (!breedRadioButtons.hasAttribute('hidden')) {
            breedRadioButtons.toggleAttribute('hidden');
        }
    }

    backButton.addEventListener('click', () => {
        document.getElementById('dangerousAnimalForm').toggleAttribute('hidden');
        document.getElementById('results').toggleAttribute('hidden');

        // Hide the dangerous breed element when resetting the form
        if (!dangerousBreedElement.hasAttribute('hidden')) {
            dangerousBreedElement.toggleAttribute('hidden');
        }
    });

    document.getElementById('submit').addEventListener('click', async () => {
        // Set properties that aren't automatic
        pet.setName(document.getElementById('petName').value);

        // Case for Mix & Unknonw Breed
        if (mixedRadio.checked) {
            pet.setBreed(mixedBreedInput.value);
        } else if (unknownRadio.checked) {
            pet.setBreed('Unknown');
        } else {
            switch (pet.getType()) {
                case 'Cat':
                    pet.setBreed('Cat');
                    break;
                case 'Dog':
                default:
                    pet.setBreed(document.getElementById('petBreed').value);
            }
        }

        // Case for Unknown Date of Birth
        if (petUnknownDateOfBirthButton.classList.contains('selected')) {
            let approximateAge = approximateAgeInput.value;
            let approximateBirthYear = new Date().getFullYear() - approximateAge;
            let approximateBirthDate = new Date();
            approximateBirthDate.setFullYear(approximateBirthYear);
            pet.setDateOfBirth(approximateBirthDate.toISOString().slice(0, 10));
        } else {
            pet.setDateOfBirth(document.getElementById('default-datepicker').value);
        }

        const response = await submitPet(pet);
        const result = await response.json();

        let breed = result.breed.join(", ")
        document.getElementById('petNameResult').textContent = result.name;
        document.getElementById('petTypeResult').textContent = result.type;
        document.getElementById('petBreedResult').textContent = breed;
        document.getElementById('petSexResult').textContent = result.sex;
        document.getElementById('petDateOfBirthResult').textContent = result.dateOfBirth;
        document.getElementById('petAgeResult').textContent = result.age;

        if (result.dangerous && dangerousBreedElement.hasAttribute('hidden')) {
            document.getElementById('breed').textContent = breed;
            dangerousBreedElement.toggleAttribute('hidden');
        }

        document.getElementById('dangerousAnimalForm').toggleAttribute('hidden');
        document.getElementById('results').toggleAttribute('hidden');
    });
}

if (document.readyState !== 'loading') {
    domReady();
} else {
    document.addEventListener('DOMContentLoaded', domReady)
}
