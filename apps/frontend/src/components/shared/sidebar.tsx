'use client';

import { Earth } from 'lucide-react';
import { ThemeToggler } from './theme-toggler';
import { SidebarUser } from './sidebar-user';

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Link from 'next/link';

export function Sidebar({ ...props }: React.ComponentProps<typeof SidebarRoot>) {
  return (
    <SidebarRoot collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='data-[slot=sidebar-menu-button]:!p-1.5'>
              <Link href='/dashboard'>
                <Earth className='!size-5' />
                <span className='text-base font-semibold'>AmbientAI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ThemeToggler />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </SidebarRoot>
  );
}
