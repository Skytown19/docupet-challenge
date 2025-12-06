<?php

namespace App\Response;

use App\Entity\DangerousBreed;
use App\Entity\Pet;
use Carbon\Carbon;
use Doctrine\ORM\EntityManager;
use function PHPUnit\Framework\isNan;

/**
 * This can probably be a model
 */
class PetResponse
{
    public string $name;
    public string $type;
    public array $breed = [];
    public string $sex;
    public string $dateOfBirth;
    public bool $dangerous;

    public function __construct(Pet $pet, array $dangerousBreed)
    {
        $this->name = $pet->getName();
        $this->type = $pet->getType();
        $this->breed = $this->formatBreed($pet->getBreed());
        $this->dangerous = $this->isDangerous($pet, $dangerousBreed);
        $this->sex = $pet->getSex();
        $this->dateOfBirth = Carbon::parse($pet->getDateOfBirth())->format('Y-m-d');
    }

    private function formatBreed($breeds): array
    {
        $formattedBreeds = [];
        foreach ($breeds as $breed) {
            $formattedBreeds[] = $breed->getType();
        }
        return $formattedBreeds;
    }

    private function isDangerous(Pet $pet, array $dangerousBreeds): bool
    {

        /*
         * Todo:
         *
         * I hate this; and I should just properly fix the relationship between breeds and dangerous breeds -.-
         */
        foreach ($pet->getBreed() as $breed) {
            if (in_array($breed->getType(), $dangerousBreeds)) {
                return true;
            }
        }

        return false;
    }
}
