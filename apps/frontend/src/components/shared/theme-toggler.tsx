'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export function ThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                      <span>Preferências de Tema</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side='right' align='center'>
                <p>Mudar o tema</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Escuro</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>Padrão do Sistema</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
