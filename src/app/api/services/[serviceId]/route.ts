import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET a single service
export async function GET(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.serviceId },
    });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error(`Error fetching service ${params.serviceId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

// UPDATE a service
export async function PUT(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl } = body;

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const updatedService = await prisma.service.update({
      where: { id: params.serviceId },
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error(`Error updating service ${params.serviceId}:`, error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.serviceId },
    });
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(`Error deleting service ${params.serviceId}:`, error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
} 