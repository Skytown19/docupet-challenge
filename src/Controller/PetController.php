<?php

namespace App\Controller;

use App\Entity\Breed;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Pet;
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
        $pet = new Pet();

        $breed = $entityManager->getRepository(Breed::class)->findBy([
            'type' => $request->getPayload()->get('breed')
        ]);

        if (empty($breed)) {
            $breed = new Breed();
            $breed->setType($request->getPayload()->get('breed'));
            $entityManager->persist($breed);
        } else {
            // Todo: this will be a loop, right now just return first
            $breed = $breed[0];
        }

        $pet->setType($request->getPayload()->get('type'));
        $pet->setName($request->getPayload()->get('name'));
        $pet->setSex($request->getPayload()->get('sex'));
        $pet->addBreed($breed);
        $pet->setDateOfBirth($request->getPayload()->get('date_of_birth'));

        /* End Todo */

        $entityManager->persist($pet);
        $entityManager->flush();

        return $this->json($pet);
    }
}
