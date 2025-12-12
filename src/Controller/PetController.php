<?php

namespace App\Controller;

use App\Entity\Breed;
use App\Entity\DangerousBreed;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Pet as PetEntity;
use App\Model\Pet as PetModel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\BreedRepository;

class PetController extends AbstractController
{
    #[Route('/pet', name: 'create_pet', methods: ['POST'])]
    public function createPet(Request $request, EntityManagerInterface $entityManager): Response
    {
        /* Todo: Move these setters into the Entity Class */
        $pet = new PetEntity();

        $breedString = $request->getPayload()->get('breed');

        $existingBreeds = array_map(function ($breed) {
            return $breed->getType();
        }, $entityManager->getRepository(Breed::class)->findAll());

        $payloadBreeds = PetModel::breedStringToCollection($breedString);

        // Creates Breeds that Don't Exist in the Database Yet
        foreach ($payloadBreeds as $payloadBreed) {
            $breed = $entityManager->getRepository(Breed::class)->findOneBy([
                'type' => $payloadBreed
            ]);

            if (empty($breed)) {
                $breed = new Breed();
                $breed->setType($payloadBreed);
                $entityManager->persist($breed);
            }

            $pet->addBreed($breed);
        }

        $pet->setType($request->getPayload()->get('type'));
        $pet->setName($request->getPayload()->get('name'));
        $pet->setSex($request->getPayload()->get('sex'));
        $pet->setDateOfBirth($request->getPayload()->get('date_of_birth'));
        $entityManager->persist($pet);
        $entityManager->flush();

        // Todo: fix this proper eventually
        $dangerousBreeds = $entityManager->getRepository(DangerousBreed::class)->findAll();
        $dangerousBreeds = array_map(function ($breed) {
            return $breed->getBreed()->getType();
        }, $dangerousBreeds);
        $petResponse = new \App\Response\PetResponse($pet, $dangerousBreeds);
        return $this->json($petResponse);
    }
}
