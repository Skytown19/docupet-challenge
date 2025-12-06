<?php

namespace App\Entity;

use App\Repository\DangerousBreedRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DangerousBreedRepository::class)]
class DangerousBreed
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'dangerous')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Breed $breed = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBreed(): ?Breed
    {
        return $this->breed;
    }

    public function setBreed(?Breed $breed): static
    {
        $this->breed = $breed;

        return $this;
    }
}
