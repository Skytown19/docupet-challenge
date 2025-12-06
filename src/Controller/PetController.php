<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Pet;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PetController extends AbstractController
{
    #[Route('/pet', name: 'create_pet', methods: ['POST'])]
    public function createPet(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pet = new Pet();

        /* Todo: Move these setters into the model */
        $pet->setType($request->getPayload()->get('type'));
        $pet->setName($request->getPayload()->get('name'));
        $pet->setSex($request->getPayload()->get('sex'));
        $pet->setDateOfBirth($request->getPayload()->get('date_of_birth'));

        /* End Todo */

        $entityManager->persist($pet);
        $entityManager->flush();

        return $this->json($pet);
    }
}
