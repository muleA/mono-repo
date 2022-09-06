import { Card } from '@mantine/core';
import { IconX } from '@tabler/icons';
interface HeaderProps {
  onclose: any;
  title?: string;
}
function Header(props: HeaderProps) {
  return (
    <Card className="ml-2  flex items-center justify-between shadow">
      <div className="text-lg">{props?.title ? props?.title : 'New'}</div>
      <div>
        <IconX
          className="cursor-pointer m-0"
          width={24}
          height={24}
          color={'gray'}
          onClick={props.onclose}
        />
      </div>
    </Card>
  );
}

export default Header;
