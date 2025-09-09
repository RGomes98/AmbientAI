'use client';

import { IconDotsVertical, IconLogout } from '@tabler/icons-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Avatar } from '@/components/ui/avatar';
import { UserCircle } from 'lucide-react';
import { useSession } from '@/providers/session.provider';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Link from 'next/link';

export function SidebarUser() {
  const { isMobile } = useSidebar();
  const { email } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
            >
              <Avatar className='flex size-8 items-center justify-center rounded-lg'>
                <UserCircle />
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{email.split('@')[0]}</span>
                <span className='text-muted-foreground truncate text-xs'>{email}</span>
              </div>
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-fit rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuItem className='p-0'>
              <Link
                href='api/session/logout'
                className='flex h-full w-full items-center gap-2 py-1.5 pr-4 pl-2'
                prefetch={false}
              >
                <IconLogout />
                Encerrar sessão
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
