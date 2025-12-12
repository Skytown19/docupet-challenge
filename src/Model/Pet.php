<?php

namespace App\Model;

use App\Entity\Breed;
use App\Repository\BreedRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class Pet
{
    function __construct(
        public string     $name,
        public string     $type,
        public string     $sex,
        public ArrayCollection $breed,
        public string     $dateOfBirth)
    {}

    public  static function breedStringToCollection(string $breedString): ArrayCollection {
        $breedArray = array_map('trim', explode(',', $breedString));
        return new ArrayCollection($breedArray);
    }

    public static function buildFromRequest(Request $request): Pet {
        $name = $request->getPayload()->get('name');
        $type = $request->getPayload()->get('type');
        $sex = $request->getPayload()->get('sex');
        $breedString = $request->getPayload()->get('breed');
        $dateOfBirth = $request->getPayload()->get('dateOfBirth');
        $breed = self::breedStringToCollection($breedString);

        return new Pet($name, $type, $sex, $dateOfBirth, $breed);
    }

}
